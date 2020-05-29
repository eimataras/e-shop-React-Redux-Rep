import React from "react";
import Link from "@material-ui/core/Link";
import {RouteComponentProps, withRouter} from "react-router-dom"

interface AccessDeniedProps extends RouteComponentProps {}

interface PassedProps {}

type Props = AccessDeniedProps & PassedProps;

const AccessDenied: React.FC<Props> = (props) => {
    return (
        <div className="center">
            <h1>Ups...</h1>
            <h3>Access denied... Please <span> </span>
                <Link component="button" onClick={() => props.history.push('/signin')}>
                    <h3>log in</h3>
                </Link>
            </h3>
        </div>
    )
};

export default withRouter(AccessDenied) as React.ComponentType<PassedProps>;
