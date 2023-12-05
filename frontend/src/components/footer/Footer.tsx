import footer from "./footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={footer.footer}>
        <div className={footer.footerInfoWrapper}>
          <div className={footer.leftFooter}>
            <h1>footer</h1>
          </div>
          <div className={footer.rigthFooter}>
            <h2>Address</h2>
          </div>
        </div>
        <div className={footer.bottonFooter}>
          <h2>© Adonay D'agosto 2023</h2>
        </div>
      </footer>
    </>
  );
}
