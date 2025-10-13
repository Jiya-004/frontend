export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Welcome, {user?.name || "User"} 👋</h1>
      <p>You have successfully logged in!</p>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}
