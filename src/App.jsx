import { SignedIn, SignedOut, SignIn, SignUp, UserButton } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <SignedOut>
          <nav>
            <Link to="/sign-in"><button>Dashboard</button></Link>
            <Link to="/"><button>Home</button></Link>
          </nav>
        </SignedOut>
        <SignedIn>
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            <UserButton />
          </nav>
        </SignedIn>
      </header>

      <Routes>
        {/* Public home page */}
        <Route path="/" element={
          <SignedOut>
            <div>
                <h1> Make Studying Fun and Simple</h1>
                <p> Quizzy makes it easy for students to learn efficiently and not procrastinate. </p>
                <Link to="/sign-up"><button>Sign Up</button></Link>

            </div>
          </SignedOut>
        } />

        {/* Auth routes */}
        <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />} />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />} />

        {/* Protected dashboard */}
        <Route path="/dashboard" element={
          <SignedIn>
            <h1>Your Flashcards</h1>
              <p>Click here to add new flashcards!</p>
          </SignedIn>
        } />
      </Routes>

      {/* Redirect signed-in users from / to /dashboard */}
      <SignedIn>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </SignedIn>
    </BrowserRouter>
  );
}