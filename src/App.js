import './App.css';
import Transaction from './components/transaction';
import TransactionProvider from './TransContext';

function App() {
  return (
    <TransactionProvider>
      <Transaction />
    </TransactionProvider>
  );
}

export default App;
