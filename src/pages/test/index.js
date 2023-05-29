import React from 'react';

const Note = () => {
  return (
    <div className="flex flex-col justify-around h-full gap-2">
      {
        Array.from({ length: 4 }, (_, i) => relativeToAbsoluteYear(term) - (i + 1)).map(item => (
          (Object.keys(data["terms"]).includes(item.toString())) ?
            <div className="flex flex-row gap-1">
              <div className="flex-1 text-lg bg-gray-200 rounded-lg w-fit h-fit px-1">
                {`${absoluteToRelativeYear(item)} (${item}):`}
              </div>
              {
                data["terms"][item]["Awarded"].length !== 0 ?
                  <div className="flex flex-row flex-wrap text-darkbermuda gap-1">
                    {data["terms"][item]["Awarded"].map(awardee => (
                      <div className="text-white bg-bermuda rounded-lg py-0.5 px-1">
                        {awardee}
                      </div>
                    ))}
                  </div>
                  :
                  <div className="text-white bg-scarlet rounded-lg py-0.5 px-1">No One Awarded</div>
              }
            </div>
            :
            <div className="flex flex-row gap-1">
              <div className="text-lg bg-gray-200 rounded-lg w-fit h-fit px-1">
                {absoluteToRelativeYear(item)} ({item}):
              </div>
              <div className="text-scarlet pt-0.5">No Data Recorded</div>
            </div>
        ))
      }
    </div>
  );
}

const Table = () => {
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Bob Johnson', age: 40 },
  ];

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead style={{ display: 'none' }}>
        <tr>
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="py-2 px-4 border-b">{item.id}</td>
            <td className="py-2 px-4 border-b">{item.name}</td>
            <td className="py-2 px-4 border-b">{item.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;