const globalAny: any = global;
export const ff = 1;
import 'bootstrap/dist/css/bootstrap.css';
import { PersistGate } from 'redux-persist/integration/react'
import waitFor from 'p-wait-for';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createWaitForElement } from 'enzyme-wait';
import { createMemoryHistory } from 'history'

// Create browser history to use in the Redux store

import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import user from '../src/img/account_circle_24px.png'
import Login from './components/Login';
import UserPanel from './containers/User/UserPanel';
import { responseModel } from './model/general/responseModel';
import { render } from '@testing-library/react';

const baseUrl = '/';
//const history = createBrowserHistory({ basename: baseUrl });
const history = require("history").createBrowserHistory({ basename: baseUrl });

const store = configureStore(history);//, persistedState);
jest.setTimeout(30000)
Enzyme.configure({ adapter: new Adapter() });

// var appWrapper = mount(<Provider store={store}>
//     <ConnectedRouter history={history}>
//         <App />
//     </ConnectedRouter>
// </Provider>);

const flushPromises = () => new Promise(setImmediate);

test('renders without crashing', () => {
    const wrapper = shallow(<App />);
    const loginIcon = <div className="text-center">
        <img src={user} alt="user icon" className="icon-account" />
    </div>
    expect(wrapper.contains(loginIcon));

})

it('login without username', async () => {
    const baseUrl = '/adminlogin';
    //const history = createBrowserHistory({ basename: baseUrl });
    //const history = require("history").createBrowserHistory({ basename: baseUrl });
    //const historyMock = { push: jest.fn() };
    const reduxContainer = configureStore(history);//, persistedState);

    //     const { getByText } = render(<Provider store={reduxContainer.store}>
    //         <PersistGate loading={null} persistor={reduxContainer.persistor}>
    //         <ConnectedRouter history={history}>
    //             <App />
    //         </ConnectedRouter>
    //         </PersistGate>
    //     </Provider>);
    //   expect(getByText('ورود')).toBeInTheDocument();

    const wrapper2: any = mount(<Provider store={reduxContainer.store}>
        <ConnectedRouter history={history}>
            <Login {...{ history: history }} />
        </ConnectedRouter>
    </Provider>);
    //    wrapper2.find('#login').simulate('click');
    //console.log(wrapper2.debug())
    jest.spyOn(history, "push");
    wrapper2.find('#username').simulate('change', { target: { value: 'sa' } })
    wrapper2.find('#password').simulate('change', { target: { value: '123' } })

    wrapper2.find('#login').simulate('click');
    const waitForSample = createWaitForElement('#ready', 5000);
        console.log('111111');
        
    await waitForSample(wrapper2)
        .then(
            console.log('2222')
        )
        // wrapper2.update()
    // console.log(wrapper2.debug())
    //expect(wrapper2.find('#ready').at(0).text()).toEqual('alireza')
    //wrapper2.instance().componentDidMount();
    //     return Promise
    //     .resolve(wrapper2)
    //     .then(() => {
    //         wrapper2.update();
    //     }).then(() => {
    // //        expect(wrapper2.find('.alert').at(0).text()).toEqual('1')
    //         console.log(wrapper2.debug())
    //     });

    // await flushPromises();
    // await wrapper2.update();
    // expect(wrapper2.find('.alert').at(0).text()).toEqual('1')

    // return Promise
    //     .resolve(wrapper2)
    //     .then(() => { })
    //     .then(() => {
    //         expect(wrapper2.find('.alert').at(0).text()).toEqual('1')
    //     });

})
function tick() {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    })
}



/*
it('login with wrong username should error message', () => {

    const wrapper2 = mount(<Provider store={store}>
        <ConnectedRouter history={history}>
            <Login />
        </ConnectedRouter>
    </Provider>);


    return Promise
        .resolve(wrapper2)
        .then(() => { })
        .then(() => {
            expect(wrapper2.find('#login').text()).toEqual('ورود');
            wrapper2.find('#username').simulate('change', { target: { value: 'sa1' } })
            wrapper2.find('#password').simulate('change', { target: { value: '1' } })

            wrapper2.find('#login').simulate('click');

            const wrapper3 = mount(<Provider store={store}>
                <ConnectedRouter history={history}>
                    <Home />
                </ConnectedRouter>
            </Provider>);
            return Promise
                .resolve(wrapper3)
                .then(() => { })
                .then(() => {
                    expect(wrapper3.find('#test').text()).toEqual('hasan');
                });

        });

})
*/

// it('login without username should display error message', () => {
//     const wrapper2 = mount(<Provider store={store}>
//         <ConnectedRouter history={history}>
//             <App />
//         </ConnectedRouter>
//     </Provider>);
//     wrapper2.find('#login').simulate('click');

//     expect(wrapper2.find('.alert').at(0).text()).toEqual('نام کاربری نباید خالی باشد')

// })

// it('after login Home component should be rendered',  () => {
//     //jest.setTimeout(20000);

//     appWrapper.find('#username').simulate('change', {
//         target: { value: 'sa' }
//     })
//     appWrapper.find('#password').simulate('change', {
//         target: { value: '1' }
//     })
//     appWrapper.find('#login').simulate('click');
//     // appWrapper.update();
//     // waitForSample(appWrapper)
//     //     .then( (copmonent:any) => expect(copmonent.text()).toContain('ready1111') );

//     const waitForListItem = createWaitForElement('.testclass', 3000);

//     return waitForListItem(appWrapper).then(
//         (componentReady:any)=> {
//             console.log('bbb');

//             //expect(componentReady.find('.testclass').exists()).toBeTruthy()
//         })

//     //const waitForSample = createWaitForElement(<App />);
//     //const componentReady = await waitForSample(appWrapper);

//     //expect(componentReady.find('.testclass').exists()).toBeTruthy()

//     // const waitForSample = createWaitForElement('.testclass');
//     // waitForSample(wrapper2)
//     //     .then(
//     //         (wrapper2: any) => {
//     //             expect(wrapper2.find('.testclass1').exists()).toBeTruthy()
//     //         }
//     //     ).catch( (err:any) => 
//     //         {
//     //         console.log(err);
//     //         }            
//     //         );

//     // jest.useFakeTimers();
//     // setTimeout(() => {
//     //     expect(wrapper2.find('.testclass').exists()).toBeTruthy()
//     //     //console.log('bbbbbbbb');

//     // }, 5500);
//     // jest.runAllTimers();


//     //expect(wrapper2.find('.alert').exists()).toBeFalsy()
//     //expect(wrapper2.find('.alert').at(0).text()).toEqual('نام کاربری نباید خالی باشد')
// })

// it('renders without crashing', () => {
//     const storeFake = (state: any) => ({
//         default: () => {},
//         subscribe: () => {},
//         dispatch: () => {},
//         getState: () => ({ ...state })
//     });
//     const store = storeFake({}) as any;

//     ReactDOM.render(
//         <Provider store={store}>
//             <MemoryRouter>
//                 <App/>
//             </MemoryRouter>
//         </Provider>, document.createElement('div'));
// });
