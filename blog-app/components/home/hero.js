import Image from "next/image";
import classes from "./hero.module.css";

const Hero = () => (
    <section className={classes.hero}>
        <div className={classes.image}>
            <Image
                src="/images/site/brandy.jpeg"
                alt="An image showing Brandy"
                width={300}
                height={300}
            />
        </div>
        <h1>Hi, I'm Brandy</h1>
        <p>I like learning about web development - especially frontend frameworks like Angular or React.</p>
    </section>
)

export default Hero;