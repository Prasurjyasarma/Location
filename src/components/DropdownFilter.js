import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const DropdownFilter = ({ selectedCategory, setSelectedCategory }) => {
  const handleSelect = (eventKey) => {
    setSelectedCategory(eventKey);
  };

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={`Categories`}
      onSelect={handleSelect}
      style={{ position: 'absolute', top: 10, right: 10, zIndex: 1100 }}
    >
      <Dropdown.Item eventKey="all">All</Dropdown.Item>
      <Dropdown.Item eventKey="indigenous">Indigenous</Dropdown.Item>
      <Dropdown.Item eventKey="non-indigenous">Non-Indigenous</Dropdown.Item>
    </DropdownButton>
  );
};

export default DropdownFilter;
