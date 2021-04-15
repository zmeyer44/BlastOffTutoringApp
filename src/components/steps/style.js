import Styled from 'styled-components';
import { Steps } from 'antd';

const StepsStyle = Styled(Steps)`
    .steps-action{
        margin-top: 40px;
        button{
            height: 44px;
        }
    }
`;

const ActionWrapper = Styled.div`
    .step-action-wrap{
        width: 420px;
        display: flex;
        justify-content: center;
        .step-action-inner{
                padding: 0 25px;

            @media only screen and (max-width: 575px){
                
                padding: 0;
            }
        }
    }
    .steps-action{
        margin-top: 38px;
        width: 100%;
        float: right
        display: flex;
        justify-content: space-between;
        @media only screen and (max-width: 991px){
            margin-top: 25px;
        }
        @media only screen and (max-width: 379px){
            flex-flow: column;
        }
        button{
            display: flex;
            align-items: center;
            height: 44px;
            padding: 0 20px;
            @media only screen and (max-width: 379px){
                justify-content: center;
            }
            &.ant-btn-light{
                border: 1px solid ${({ theme }) => theme['border-color-light']};
            }
            &.btn-next{
                svg{
                    margin-left: 10px;
                }
            }
            &.btn-prev{
                svg{
                    margin-right: 10px;
                }
            }
        }
        button + button {
            @media only screen and (max-width: 379px){
                margin-top: 15px;
            }
        }
    }
`;

export { StepsStyle, ActionWrapper };
