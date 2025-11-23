import { SignedIn, SignedOut, SignIn, SignUp, UserButton } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <SignedOut>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
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
            <h1>Welcome to Flashcard App!</h1>
            <p>Sign in to get started</p>
          </SignedOut>
        } />

        {/* Auth routes */}
        <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />} />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />} />

        {/* Protected dashboard */}
        <Route path="/dashboard" element={
          <SignedIn>
            <h1>Your Flashcards</h1>
            <p>Dashboard content goes here</p>
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