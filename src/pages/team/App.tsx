import './index.css'
import { Header } from "../../components/header";
import { asPage } from "@/lib/utils";
import { Headshot } from './Headshot';

export function TeamPage() {
  return (
    <>
      <Header links={[{label: 'Home', href: '/'}, {label: 'Team', href: '/team'}, {label: 'Mission', href: '/mission'}]} />
      <div className="my-auto w-full mt-16">
        <div className="text-center py-24">
            <h1 className="text-8xl font-light">OUR AMAZING TEAM</h1>
        </div>
        <Headshot imageSrc='/assets/images/mainasara-hs.jpeg' name='Mainasara Tsowa'>
            <p>
            A seasoned Full-Stack Developer, Infrastructure Specialist, and Security
            Engineer with extensive experience spanning all stages of web
            development and cybersecurity. Having worked in industries like finance,
            education, social media, and social commerce then managing government security software contracts, and
            securing government assets, he founded QRK to awaken the Ummah.
            </p>
        </Headshot>
      </div>
    </>
  );
}