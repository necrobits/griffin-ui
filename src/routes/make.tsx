import React from 'react';
import { Route } from 'react-router-dom';
import PublicRoute from '~/routes/PublicRoute';
import { IRoute } from '~/routes/routes';

const makeRoute = (route: IRoute, id: string) => {
    const Guard = route.guard || PublicRoute;
    const Component = route.component;

    const requiredRoles = route.requiredRoles || [];
    const propsGuard = route.propsGuard || {};
    if (propsGuard.targetPath == null) {
        propsGuard.targetPath = '';
    }
    const opts: any = {};
    if (route.exact) {
        opts.index = true;
        propsGuard.targetPath += '/';
    } else {
        opts.path = route.path;
        propsGuard.targetPath += '/' + route.path;
    }
    let component;
    if (route.props) {
        // eslint-disable-next-line react/display-name
        component = () => <Component {...route.props} />;
    } else {
        component = Component;
    }

    const guard = <Guard requiredRoles={requiredRoles} component={component} {...propsGuard} />;
    if (route.routes && route.routes.length > 0) {
        return (
            <Route key={`routes-${id}`} {...opts} element={guard}>
                {route.routes
                    ? makeRoutes(
                          route.routes.map(r => ({ guard: route.guard, ...r })),
                          id
                      )
                    : null}
            </Route>
        );
    }
    return <Route key={`routes-${id}`} {...opts} element={guard} />;
};

export const makeRoutes = (routes: IRoute[], id?: string) => {
    return <>{routes ? routes.map((route: IRoute, idx: number) => makeRoute(route, `${id ? `${id}-${idx}` : idx}`)) : null}</>;
};
