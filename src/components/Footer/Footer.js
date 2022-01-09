import FooterNav from "./FooterNav";
import FooterPay from "./FooterPay";
import FooterContacts from "./FooterContacts";

export default function Footer() {
  return (
    <footer className="container bg-light footer">
      <div className="row">
        <FooterNav />
        <FooterPay />
        <FooterContacts />
      </div>
    </footer>
  );
}
