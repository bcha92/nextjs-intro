import Link from "next/link";
import Logo from "./logo";
import classes from "./main-navigation.module.css";

const MainNavigation = () => (
    <header className={classes.header}>
        <Link href="/">
            <Logo />
        </Link>
        <nav>
            <ul>
                <li><Link href="/posts">Posts</Link></li>
                <li><Link href="/contact">Contatct</Link></li>
            </ul>
        </nav>
    </header>
)

export default MainNavigation;