import * as React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
//custom imports
import AppInventoryList from './pages/AppInventoryList';
import EditApp from './pages/EditApp';

const AppRouter = () =>
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<AppInventoryList />} />
                <Route path="editapp" element={<EditApp />} />
            </Route>
        </Routes>
    </BrowserRouter>

export default AppRouter;