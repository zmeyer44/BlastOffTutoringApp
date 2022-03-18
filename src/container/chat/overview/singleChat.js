/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { SingleChatWrapper, MessageList, Footer } from '../style';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { newMessage, newConversation, setRead } from '../../../redux/firebase/messages/actionCreator';
import { supportTicket } from '../../../redux/firebase/support/actionCreator';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../components/dropdown/dropdown';

const SingleChat = ({ match }) => {
  const dispatch = useDispatch();
  const msgSection = useRef();

  const { rtl, chat, uid, convosOrdered, isLoader } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      chat: state.chatSingle.data,
      uid: state.fb.auth.uid,
      convosOrdered: state.fs.ordered.conversations,
      isLoader: state.conversations.loading,
    };
  });

  const left = !rtl ? 'left' : 'right';

  const [state, setState] = useState({
    chatData: chat,
    singleContent: false,
    me: uid,
    name: 'Not Found',
    inputValue: '',
    fileList: [],
    fileList2: [],
    loading: isLoader,
    newConvo: false,
  });

  const { singleContent, name, profileImage, me, inputValue, fileList, fileList2, loading, newConvo } = state;

  // ?
  useEffect(() => {
    let unmounted = false;
    let name;
    let profileImage;

    if (convosOrdered) {
      let currentConvo;
      if (match.params.id) {
        let tempConvo = convosOrdered.filter(convo => {
          return convo.users.includes(match.params.id);
        });
        currentConvo = tempConvo[0];
      } else {
        //no props, not a new convo, just pressed the button
        currentConvo = convosOrdered[convosOrdered.length - 1];
      }
      // At this point current convo is either 1 conversation or none.

      if (currentConvo) {
        if (currentConvo.users[0] == uid) {
          name = currentConvo.user2.name;
          profileImage = currentConvo.user2.profileImage;
        } else {
          name = currentConvo.user1.name;
          profileImage = currentConvo.user1.profileImage;
        }
        if (!unmounted) {
          setState({
            ...state,
            chatData: currentConvo,
            singleContent: currentConvo,
            name: name,
            profileImage,
            inputValue,
            me: uid,
            fileList,
            fileList2,
            loading: isLoader,
          });
        }
      } else {
        if (!newConvo) {
          setState({
            ...state,
            newConvo: true,
          });
          dispatch(newConversation(uid, match.params.id));
        }
      }
    } else if (convosOrdered) {
      if (match.params.id && convosOrdered.length === 0) {
        if (!newConvo) {
          setState({
            ...state,
            newConvo: true,
          });
          dispatch(newConversation(uid, match.params.id));
        }
      }
    } else {
      console.log('Null');
    }

    return () => {
      unmounted = true;
    };
  }, [match]);

  useEffect(() => {
    msgSection.current.scrollToBottom();
  }, [state]);

  useEffect(() => {
    if (state.chatData) {
      console.log('dispatching');

      if (state.chatData.notification?.from !== null && state.chatData.notification?.from !== uid) {
        dispatch(setRead(state.chatData, null));
      }
    }
  }, [state.chatData]);
  const badWords = [
    'joe biden is great',
    '4r5e',
    '5h1t',
    '5hit',
    'a55',
    ' anal',
    'ar5e',
    'arrse',
    'ass-fucker',
    'assfucker',
    'assfukka',
    'asshole',
    'assholes',
    'asswhole',
    'a_s_s',
    'b!tch',
    'b00bs',
    'b17ch',
    'b1tch',
    'ballsack',
    'bastard',
    'beastial',
    'beastiality',
    'bellend',
    'bestial',
    'bestiality',
    'bi+ch',
    'biatch',
    'bitch',
    'bitcher',
    'bitchers',
    'bitches',
    'bitchin',
    'bitching',
    'blow job',
    'blowjob',
    'blowjobs',
    'boiolas',
    'bollock',
    'bollok',
    'boner',
    'boob',
    'boobs',
    'booobs',
    'boooobs',
    'booooobs',
    'booooooobs',
    'breasts',
    'buceta',
    'bugger',
    'bunny fucker',
    'butthole',
    'buttmuch',
    'buttplug',
    'c0ck',
    'c0cksucker',
    'carpet muncher',
    'cawk',
    'chink',
    'cipa',
    'cl1t',
    ' clit',
    'clitoris',
    ' clits',
    ' cnut',
    ' cock ',
    'cock-sucker',
    'cockface',
    'cockhead',
    'cockmunch',
    'cockmuncher',
    ' cocks ',
    'cocksuck',
    'cocksucked',
    'cocksucker',
    'cocksucking',
    'cocksucks',
    'cocksuka',
    'cocksukka',
    'cokmuncher',
    'coksucka',
    ' crap',
    'cummer',
    'cumming',
    'cumshot',
    'cunilingus',
    'cunillingus',
    'cunnilingus',
    ' cunt',
    'cuntlick',
    'cuntlicker',
    'cuntlicking',
    ' cunts',
    'cyalis',
    'cyberfuc',
    'cyberfuck',
    'cyberfucked',
    'cyberfucker',
    'cyberfuckers',
    'cyberfucking',
    'd1ck',
    ' dick',
    'dickhead',
    'dildo',
    'dildos',
    'dinks',
    'dirsa',
    'dlck',
    'dog-fucker',
    'doggin',
    'dogging',
    'donkeyribber',
    'doosh',
    'duche',
    'dyke',
    'ejaculate',
    'ejaculated',
    'ejaculates',
    'ejaculating',
    'ejaculatings',
    'ejaculation',
    'ejakulate',
    'f u c k',
    'f u c k e r',
    'f4nny',
    ' fag',
    'fagging',
    'faggitt',
    'faggot',
    'faggs',
    'fagot',
    'fagots',
    ' fags',
    'fanny',
    'fannyflaps',
    'fannyfucker',
    'fanyy',
    'fatass',
    'fcuk',
    'fcuker',
    'fcuking',
    'fecker',
    'felching',
    'fellate',
    'fellatio',
    'fingerfuck',
    'fingerfucked',
    'fingerfucker',
    'fingerfuckers',
    'fingerfucking',
    'fingerfucks',
    'fistfuck',
    'fistfucked',
    'fistfucker',
    'fistfuckers',
    'fistfucking',
    'fistfuckings',
    'fistfucks',
    'flange',
    'fook',
    'fooker',
    'fuck',
    'fucka',
    'fucked',
    'fucker',
    'fuckers',
    'fuckhead',
    'fuckheads',
    'fuckin',
    'fucking',
    'fuckings',
    'fuckingshitmotherfucker',
    'fuckme',
    'fucks',
    'fuckwhit',
    'fuckwit',
    'fudge packer',
    'fudgepacker',
    'fuker',
    'fukker',
    'fukkin',
    'fuks',
    'fukwhit',
    'fukwit',
    ' fux',
    'fux0r',
    'f_u_c_k',
    'gangbang',
    'gangbanged',
    'gangbangs',
    'gaylord',
    'gaysex',
    'goatse',
    'god-dam',
    'god-damned',
    'goddamn',
    'goddamned',
    'hardcoresex',
    'heshe',
    ' hoar ',
    'hoare',
    'hoer',
    'homo',
    ' hore',
    'horniest',
    'horny',
    'hotsex',
    'jack-off',
    'jackoff',
    ' jap ',
    'jerk-off',
    'jism',
    ' jiz ',
    'jizm',
    'jizz',
    'kawk',
    'knobead',
    'knobed',
    'knobend',
    'knobhead',
    'knobjocky',
    'knobjokey',
    'kondum',
    'kondums',
    'kummer',
    'kumming',
    ' kums ',
    'kunilingus',
    'l3i+ch',
    'l3itch',
    'labia',
    'm0f0',
    'm0fo',
    'm45terbate',
    'ma5terb8',
    'ma5terbate',
    'masochist',
    'master-bate',
    'masterb8',
    'masterbat*',
    'masterbat3',
    'masterbate',
    'masterbation',
    'masterbations',
    'masturbate',
    'mo-fo',
    'mof0',
    ' mofo ',
    'mothafuck',
    'mothafucka',
    'mothafuckas',
    'mothafuckaz',
    'mothafucked',
    'mothafucker',
    'mothafuckers',
    'mothafuckin',
    'mothafucking',
    'mothafuckings',
    'mothafucks',
    'mother fucker',
    'motherfuck',
    'motherfucked',
    'motherfucker',
    'motherfuckers',
    'motherfuckin',
    'motherfucking',
    'motherfuckings',
    'motherfuckka',
    'motherfucks',
    ' muff ',
    'mutha',
    'muthafecker',
    'muthafuckker',
    'muther',
    'mutherfucker',
    'n1gga',
    'n1gger',
    ' nazi ',
    'nigg3r',
    'nigg4h',
    'nigga',
    'niggah',
    'niggas',
    'niggaz',
    'nigger',
    'niggers',
    'nob jokey',
    'nobhead',
    'nobjocky',
    'nobjokey',
    'numbnuts',
    'nutsack',
    'orgasim',
    'orgasims',
    'orgasm',
    'orgasms',
    'p0rn',
    'pawn',
    'pecker',
    'penis',
    'penisfucker',
    'phonesex',
    'phuck',
    'phuk',
    'phuked',
    'phuking',
    'phukked',
    'phukking',
    'phuks',
    'phuq',
    'pigfucker',
    'pimpis',
    ' piss',
    'pissed',
    'pisser',
    'pissers',
    'pisses',
    'pissflaps',
    'pissin',
    'pissing',
    'pissoff',
    'poop',
    'porn',
    'porno',
    'pornography',
    'pornos',
    'prick',
    'pricks',
    'pron',
    ' pube ',
    ' pusse ',
    'pussi',
    'pussies',
    'pussy',
    'pussys',
    'rectum',
    'retard',
    'rimjaw',
    'rimming',
    's.o.b.',
    'sadist',
    'schlong',
    'screwing',
    'scroat',
    'scrote',
    'scrotum',
    'semen',
    ' sex ',
    'sh!+',
    'sh!t',
    'sh1t',
    'shag',
    'shagger',
    'shaggin',
    'shagging',
    'shemale',
    'shi+',
    'shit',
    'shitdick',
    'shite',
    'shited',
    'shitey',
    'shitfuck',
    'shitfull',
    'shithead',
    'shiting',
    'shitings',
    'shits',
    'shitted',
    'shitter',
    'shitters',
    'shitting',
    'shittings',
    'shitty',
    'skank',
    'slut',
    'sluts',
    'smegma',
    'smut',
    'snatch',
    'son-of-a-bitch',
    'spunk',
    's_h_i_t',
    't1tt1e5',
    't1tties',
    'teets',
    'testical',
    'testicle',
    ' tit ',
    'titfuck',
    ' tits',
    ' titt ',
    'tittie5',
    'tittiefucker',
    'titties',
    'tittyfuck',
    'tittywank',
    'titwank',
    'tosser',
    'turd',
    'tw4t',
    'twat',
    'twathead',
    'twatty',
    'twunt',
    'twunter',
    'v14gra',
    'v1gra',
    'vagina',
    'viagra',
    'vulva',
    'w00se',
    ' wank ',
    'wanker',
    'wanky',
    'whoar',
    'whore',
    'willies',
    'willy',
    'xrated',
    ' xxx ',
  ];

  function hasBadWord(msg) {
    return badWords.some(word => msg.includes(word));
  }
  const handleChange = e => {
    setState({
      ...state,
      inputValue: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue) {
      const pushcontent = {
        content: inputValue,
        timestamp: new Date().getTime(),
        seen: false,
        sentBy: me,
      };
      if (hasBadWord(inputValue)) {
        alert('Message has been flagged for objectionable language.');
        dispatch(
          supportTicket({
            chatId: state.chatData.id,
            message: inputValue,
            sentBy: me,
            type: 'Message flagged for bad language',
          }),
        );
      } else {
        dispatch(newMessage(state.chatData.id, pushcontent));
      }
      setState({
        ...state,
        inputValue: '',
      });
    }
  };

  // const props = {
  //   name: 'file',
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   listType: 'picture-card',
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       // console.log(info.file, info.fileList);
  //       setState({
  //         ...state,
  //         fileList: info.fileList,
  //       });
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };
  // const attachment = {
  //   name: 'file',
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       // console.log(info.file, info.fileList);
  //       setState({
  //         ...state,
  //         fileList2: info.fileList,
  //       });
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  const renderView = ({ style, ...props }) => {
    const customStyle = {
      marginRight: 'auto',
      [rtl ? 'left' : 'right']: '2px',
      [rtl ? 'marginLeft' : 'marginRight']: '-19px',
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  };

  const renderThumbVertical = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
      [left]: '2px',
    };
    return <div style={{ ...style, ...thumbStyle }} props={props} />;
  };

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      [rtl ? 'left' : 'right']: '6px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div style={thumbStyle} />;
  };

  const renderThumbHorizontal = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} props={props} />;
  };

  const content = (
    <>
      <NavLink to="#">
        <FeatherIcon icon="users" size={14} />
        <span>Create new group</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon icon="trash-2" size={14} />
        <span>Delete conversation</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon icon="slash" size={14} />
        <span>Block & Report</span>
      </NavLink>
    </>
  );

  return (
    <SingleChatWrapper>
      <Cards
        title={
          <>
            <Heading as="h5">{!loading && name}</Heading>
            {/* <p>Active Now</p> */}
          </>
        }
        isbutton={[
          <Dropdown content={content} key="1">
            <Link to="#">
              <FeatherIcon icon="more-vertical" />
            </Link>
          </Dropdown>,
        ]}
      >
        <ul className="atbd-chatbox">
          <Scrollbars
            className="custom-scrollbar"
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
            renderThumbHorizontal={renderThumbHorizontal}
            renderThumbVertical={renderThumbVertical}
            renderView={renderView}
            renderTrackVertical={renderTrackVertical}
            ref={msgSection}
          >
            {!loading && singleContent ? (
              singleContent.messages.map((mes, index) => {
                const id = mes.timestamp;

                const same = moment(id).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');

                return (
                  <Fragment key={id}>
                    {false && (
                      <p className="time-connector text-center text-capitalize">
                        <span>today</span>
                      </p>
                    )}
                    <li className="atbd-chatbox__single" key={id} style={{ overflow: 'hidden' }}>
                      <div className={mes.sentBy !== me ? 'left' : 'right'}>
                        {mes.sentBy !== me ? <img src={profileImage} alt="" /> : null}

                        <div className="atbd-chatbox__content">
                          <Heading as="h5" className="atbd-chatbox__name">
                            {mes.sentBy !== me && name}
                            <span>{same ? moment(id).format('hh:mm A') : moment(id).format('LL')}</span>
                          </Heading>

                          {mes.sentBy !== me ? (
                            <div className="atbd-chatbox__contentInner d-flex">
                              <div className="atbd-chatbox__message">
                                <MessageList className="message-box">{mes.content}</MessageList>
                              </div>
                            </div>
                          ) : (
                            <div className="atbd-chatbox__contentInner d-flex">
                              <div className="atbd-chatbox__message">
                                <MessageList className="message-box">{mes.content}</MessageList>
                              </div>
                            </div>
                          )}
                          {mes.sentBy === me && singleContent.length === index + 1 ? (
                            <div className="message-seen text-right">
                              <span className="message-seen__time"> </span>
                              {/* <span className="message-seen__time">Seen 9:20 PM </span> */}
                              <img src={mes.profileImage} alt="" />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  </Fragment>
                );
              })
            ) : (
              <p>No data found</p>
            )}
          </Scrollbars>
        </ul>

        <Footer>
          <form onSubmit={handleSubmit}>
            <div
              className={`chatbox-reply-form d-flex ${state.fileList.length && 'hasImage'} ${state.fileList2.length &&
                'hasFile'}`}
            >
              <div className="chatbox-reply-input">
                <span className="smile-icon">
                  <FeatherIcon icon="smile" size={24} />
                </span>
                <input
                  onChange={handleChange}
                  placeholder="Type your message..."
                  name="chat"
                  id="chat"
                  style={{ width: '100%' }}
                  value={inputValue}
                />
              </div>
              <div className="chatbox-reply-action d-flex">
                <Button onClick={handleSubmit} type="primary" className="btn-send">
                  <FeatherIcon icon="send" size={18} />
                </Button>
              </div>
            </div>
          </form>
        </Footer>
      </Cards>
    </SingleChatWrapper>
  );
};

SingleChat.propTypes = {
  match: PropTypes.object,
};
export default SingleChat;
