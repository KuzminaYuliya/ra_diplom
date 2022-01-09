import Banner from "./Banner";

export default function MainContainer({ children }) {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          {children}
        </div>
      </div>
    </main>
  );
}
