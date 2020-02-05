import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './index.scss';

/*
 * Drop down menu to select protein to visualize.
 */
const Dropdown = props => {
  const { options, updateSel } = props;
  const inputLabel = useRef(null);
  const [val, setValue] = useState('');

  const handleChange = event => {
    const {
      target: { value: newVal }
    } = event;
    setValue(newVal);
    updateSel(newVal);
  };

  const generateMenuItems = opts => {
    const menuItems = [];
    menuItems.push(
      <MenuItem value=" " key="default">
        None
      </MenuItem>
    );

    opts.forEach((opt, idx) => {
      const { value, label } = opt;
      const mItem = (
        <MenuItem value={idx} key={`key${value}`}>
          {label}
        </MenuItem>
      );
      menuItems.push(mItem);
    });
    return menuItems;
  };

  const menuList = generateMenuItems(options);

  return (
    <FormControl variant="outlined" className="drop-down">
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Protein Name
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={val}
        onChange={handleChange}
        autoWidth
      >
        {menuList}
      </Select>
    </FormControl>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateSel: PropTypes.func.isRequired
};

export default Dropdown;
