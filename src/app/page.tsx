'use client'

import Main from "./components/Main";

const Home = () => {
    return (
      <div className="container mx-auto p-4">
        {typeof window !== 'undefined' && <Main />}
      </div>
    );
  };
  
  export default Home;