import UserCard from './components/user-card/UserCard';

const App = ({}) => {
  return (
    <div className="flex flex-col bg-gray-50 relative">
      <header className="my-3 text-center">Header here</header>
      <UserCard />
      <div className="fixed bottom-0 w-full text-center bg-gray-50">
        <div>Footer here</div>
      </div>
    </div>
  );
};

export default App;
