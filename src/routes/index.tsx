import { Route, Routes } from 'react-router-dom';
import { routes } from '~/routes/routes';
import { makeRoutes } from '~/routes/make';
import React from 'react';

const Router = () => {
    return (
        <Routes>
            <Route path='/'>{makeRoutes(routes)}</Route>
        </Routes>
    );
};

export default Router;
