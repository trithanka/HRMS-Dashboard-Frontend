import SignInPage from "../features/authentication/page";
import "../styles/authStyles.css";
import AshokStumb from "../assets/ashokstumb.png";
import CogLogo from "../assets/cog_logo.png";

export default function Auth() {
  return (
    <>
      <header className="auth_header">
        <div className="logo_container">
          <img src={CogLogo} alt="Cognitive Tech Logo" width={100} height={100} />
          <div>
            <h3>Cognitive Tech</h3>
            <h6>Human Resource Management System</h6>
          </div>
        </div>
      </header>

      <SignInPage />

      <footer>
        Copyright ©All Rights Reserved - 2025 | Cognitive Tech
      </footer>
    </>
  );
}
