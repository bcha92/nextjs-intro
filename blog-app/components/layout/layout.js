import { Fragment } from "react";
import MainNavigation from "./main-navigation";

const Layout = (props) => (
    <Fragment>
        <MainNavigation />
        <main>{props.children}</main>
    </Fragment>
)

export default Layout;