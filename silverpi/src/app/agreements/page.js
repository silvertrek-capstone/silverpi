// pages/agreements.js



const agreementsData = [
  {
    id: 1,
    title: 'Agreement 1',
    content: 'This is the content of Agreement 1.',
  },
  {
    id: 2,
    title: 'Agreement 2',
    content: 'This is the content of Agreement 2.',
  },
  // Add more agreements as needed
];

export default function Agreements() {
  return (
    <div>
      <h1>Agreements</h1>
      <ul>
        {agreementsData.map((agreement) => (
          <li key={agreement.id}>
            <h3>{agreement.title}</h3>
            <p>{agreement.content}</p>
            <Link href={`/agreements/${agreement.id}`}>
              <a>View Agreement</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}