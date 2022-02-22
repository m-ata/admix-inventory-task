import * as React from 'react';
import AppRouter from './Router';
import { Provider } from "react-redux";
import { store } from '../src/redux/store';
import 'antd/dist/antd.css';

const App = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
export default App;