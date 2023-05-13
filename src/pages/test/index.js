import { useState } from 'react';

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    toggleDropdown();
  };

  return (
    <div className="relative">
      {isOpen && (
        <ul className="bg-white rounded-md shadow-md w-full z-10">
          {items.map((item) => (
            <li key={item.value} className="p-2 cursor-pointer" onClick={() => handleItemClick(item)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
      <div className="absolute bg-gray-200 rounded-md p-2 cursor-pointer" onClick={toggleDropdown}>
        {selectedItem ? selectedItem.label : 'Select an item'}
      </div>
    </div>
  );
};

const items = [
  { label: 'Item 1', value: 'item-1' },
  { label: 'Item 2', value: 'item-2' },
  { label: 'Item 3', value: 'item-3' },
];

const MyComponent = () => {
  return (
    <div>
      <h1>Select an item:</h1>
      {/* <Dropdown items={items} /> */}
      <input className="flex grow border-2 w-1/6 max-w-auto"/>
    </div>
  );
};

export default MyComponent;
