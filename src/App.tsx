import { useState } from 'react';
import { Tablist } from './Tablist';
import { Header } from './Header';

export default function App() {
  const value = 'monthly' as 'weekly' | 'monthly';
  const items = [
    { label: 'content list one', value },
    { label: 'content list two', value },
    { label: 'content list three', value },
    { label: 'content list four', value },
  ];

  const [tablist, setTablist] = useState([
    {
      title: 'List One',
      checked: true,
      items,
    },
    {
      title: 'List Two',
      checked: false,
      items,
    },
  ]);
  return (
    <>
      <Header />
      <Tablist list={tablist} onChange={setTablist} />
    </>
  );
}
