import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { InvoiceHeader, InvoiceLetterBox, InvoiceAction, ProductTable, OrderSummary } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { fetchReviews } from '../../redux/firebase/sessions/actionCreator';
import firebase from 'firebase';

const Invoice = () => {
  var db = firebase.firestore();

  const { rtl, uid, tutor } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      uid: state.fb.auth.uid,
      tutor: state.fb.profile,
    };
  });

  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchRecords = async uid => {
    const data = [];
    let totalTime = 0;
    const response = db
      .collection('sessions')
      .where('tutor.id', '==', uid)
      .where('status', '==', 'approved');
    const query = await response.get();
    query.docs.forEach((record, index) => {
      let rec = record.data();
      totalTime += rec.duration;
      let formatedRec = {
        key: index + 1,
        row: index + 1,
        details: (
          <>
            <div className="product-info">
              <Heading className="product-info-title" as="h6">
                {rec.title}
              </Heading>
              <ul className="info-list">
                <li>
                  <span className="info-title">Subject :</span>
                  <span>{rec.subject}</span>
                </li>
              </ul>
            </div>
          </>
        ),
        status: <span className="product-status">{rec.status}</span>,
        date: <span className="product-quantity">{rec.date}</span>,
        duration: <span className="product-total-price">{`${rec.duration} minutes`}</span>,
      };
      data.push(formatedRec);
    });
    setRecords(data);
    console.log(totalTime);
    setTotal(totalTime);
  };
  useEffect(() => {
    if (uid) {
      fetchRecords(uid);
      setLoading(false);
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      setDate(today);
    }
  }, [uid]);

  const invoiceTableColumns = [
    {
      title: '#',
      dataIndex: 'row',
      key: 'row',
    },
    {
      title: 'Session Details:',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Date of Session:',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status:',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Duration:',
      dataIndex: 'duration',
      key: 'duration',
    },
  ];

  const printInvoice = () => {
    window.print();
  };

  const downloadInvoice = () => {
    // var pdf = new jsPDF('p', 'pt', 'letter');
    // pdf.canvas.height = 72 * 11;
    // pdf.canvas.width = 72 * 8.5;

    // pdf.fromHTML(document.body);

    // pdf.save('test.pdf');
    window.print();
  };

  return (
    <div className="invoice-area">
      <PageHeader
        ghost
        title="Record"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" key="4" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Missing Hours?
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={15}>
          <Col md={24}>
            {records ? (
              <Cards headless>
                <div className="invoice-content-wrap" id="print-invoice-content">
                  <InvoiceHeader>
                    <Row>
                      <Col sm={12} xs={24}>
                        <figure className="company-logo">
                          <img className="top-img" src={require('../../static/img/Logo_Dark.svg')} alt="logo" />
                        </figure>
                      </Col>
                      <Col sm={12} xs={24}>
                        <div>
                          <address className="invoice-info">
                            Blast Off Tutoring <br />
                            71 Roundtree Drive <br />
                            Plainview, NY 11803, USA
                          </address>
                        </div>
                      </Col>
                    </Row>
                  </InvoiceHeader>
                  <InvoiceLetterBox>
                    <div className="invoice-letter-inner">
                      <article className="invoice-author">
                        <Heading className="invoice-author__title" as="h3">
                          Certificate
                        </Heading>
                        <p>{`No : #${uid}`}</p>
                        <p>{`Date : ${date}`}</p>
                      </article>
                      <div className="invoice-barcode">
                        <Cards headless>
                          <img style={{ width: '100%' }} src={require('../../static/img/barcode.png')} alt="barcode" />
                          <p>{uid}</p>
                        </Cards>
                      </div>
                      <address className="invoice-customer">
                        <Heading className="invoice-customer__title" as="h5">
                          Tutor:
                        </Heading>
                        <p>
                          {`${tutor.firstName} ${tutor.lastName}`} <br />
                          {tutor.school} <br />
                        </p>
                      </address>
                    </div>
                  </InvoiceLetterBox>

                  <br />
                  <br />
                  <ProductTable>
                    <div className="table-invoice table-responsive">
                      <Table dataSource={records} columns={invoiceTableColumns} pagination={false} />
                    </div>
                  </ProductTable>

                  <Row justify="end">
                    <Col xxl={4} xl={5} sm={8} xs={14} offset={rtl ? 0 : 10}>
                      <OrderSummary>
                        <div className="invoice-summary-inner">
                          <ul className="summary-list">
                            {/* <li>
                              <span className="summary-list-title">Subtotal :</span>
                              <span className="summary-list-text">{`1 hour`}</span>
                            </li> */}
                            {/* <li>
                              <span className="summary-list-title">Discount :</span>
                              <span className="summary-list-text">{`$${-20}`}</span>
                            </li>
                            <li>
                              <span className="summary-list-title">Shipping Charge :</span>
                              <span className="summary-list-text">{`$${30}`}</span>
                            </li> */}
                          </ul>
                          <Heading className="summary-total" as="h4">
                            <span className="summary-total-label">Total Time : </span>
                            <span className="summary-total-amount">{total} minutes</span>
                          </Heading>
                        </div>
                      </OrderSummary>
                    </Col>
                  </Row>
                  <Row justify="end">
                    <Col lg={12} md={18} sm={24} offset={0}>
                      <InvoiceAction>
                        <Button size="small" shape="round" type="default" onClick={() => printInvoice()}>
                          <FeatherIcon icon="printer" size={14} />
                          Print
                        </Button>
                        <Button size="small" shape="round" type="default">
                          <FeatherIcon icon="send" size={14} />
                          Send Record
                        </Button>
                        <Button size="small" shape="round" type="primary" onClick={() => downloadInvoice()}>
                          <FeatherIcon icon="download" size={14} />
                          Download
                        </Button>
                      </InvoiceAction>
                    </Col>
                  </Row>
                </div>
              </Cards>
            ) : (
              <Cards headless>
                <div className="invoice-content-wrap" id="print-invoice-content">
                  <InvoiceLetterBox>
                    <div className="invoice-letter-inner">
                      <article className="invoice-author">
                        <Heading className="invoice-author__title" as="h3">
                          Loading...
                        </Heading>
                      </article>
                    </div>
                  </InvoiceLetterBox>
                </div>
              </Cards>
            )}
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default Invoice;
