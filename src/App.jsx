import { SignedIn, SignedOut, SignIn, SignUp, UserButton } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <SignedOut>
          <nav>
            <Link to="/"><button>Home</button></Link>
            <Link to="/sign-in"><button>Dashboard</button></Link>
          </nav>
        </SignedOut>
        <SignedIn>
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            <UserButton />
          </nav>
        </SignedIn>
      </header>

      <main className="main-content">
        <Routes>
          {/* Public home page */}
          <Route path="/" element={
            <SignedOut>
              <div>
                <h1> Make Studying Fun and Simple</h1>
                <p> Quizzy makes it easy for students to learn efficiently and not procrastinate. </p>
                <Link to="/sign-up"><button className="sign-up-button-main">Sign up to start the learning journey!</button></Link>
              </div>
            </SignedOut>
          } />

          {/* Auth routes */}
          <Route path="/sign-in" element={<div className="auth-center"><SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" /></div>} />
          <Route path="/sign-up" element={<div className="auth-center"><SignUp routing="path" path="/sign-up" signInUrl="/sign-in" /></div>} />

          {/* Protected dashboard */}
          <Route path="/dashboard" element={
            <SignedIn>
              <div>
                <h1>Your Flashcards</h1>
                <p>Click here to add new flashcards!</p>
              </div>
            </SignedIn>
          } />
        </Routes>

        {/* Redirect signed-in users from / to /dashboard */}
        <SignedIn>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </SignedIn>
      </main>
    </BrowserRouter>
  );
}