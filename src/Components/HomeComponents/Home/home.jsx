import useDarkMode from '../../../Hooks/useDarkMode';

function Home() {
  useDarkMode();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4 relative text-slate-900 dark:text-white">    
     Welcome to home
    </div>
  );
}

export default Home;