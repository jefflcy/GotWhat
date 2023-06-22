import SideMenu from "../components/SideMenu";

export default function SignupPage() {
  return (
    <>
      <SideMenu />
      <form>
        <div>
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <label>
            <b>Email</b>
          </label>
          <input type="text" placeholder="Enter Email" required />
          <label>
            <b>Password</b>
          </label>
          <input type="password" placeholder="Enter Password" required />
          <label>
            <b>Repeat Password</b>
          </label>
          <input type="password" placeholder="Repeat Password" required />

          <p>
            By creating an account you agree to our{" "}
            <a href="#" style={{ color: "dodgerblue" }}>
              Terms &amp; Privacy
            </a>
            .
          </p>
          <div>
            <button>Cancel</button>
            <button>Sign Up</button>
          </div>
        </div>
      </form>
    </>
  );
}
