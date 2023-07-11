import React, { useState } from 'react';

const TreeNode = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const toggleNode = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <span className={hasChildren ? 'caret' : ''} onClick={toggleNode}>
        
      </span>{node.label}
      {hasChildren && isOpen && (
        <ul className="nested">
          {node.children.map((childNode) => (
            <TreeNode key={childNode.label} node={childNode} />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeView = () => {
  const initialTreeData = [
    {
      label: 'Dhaka',
      children: [
        {
          label: 'Faridpur',
          children: []
        },
        {
          label: 'Gopalganj',
          children: []
        },
        {
          label: 'Madaripur',
          children: [
            {
              label: 'Dasar Upazila',
              children: []
            },
            {
              label: 'Kalkini Upazila',
              children: []
            },
            {
              label: 'Rajoir Upazila',
              children: [
                {
                  label: 'Amgram union ',
                  children: []
                },
                {
                  label: 'Badarpasha union ',
                  children: []
                },
                {
                  label: 'Bajitpur union ',
                  children: []
                },
                {
                  label: 'Hossainpur union ',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: 'Rajshahi',
      children: [
        {
          label: 'Natore',
          children: []
        },
        {
          label: 'Rajshahi',
          children: []
        },
        {
          label: 'Naogaon',
          children: [
            {
              label: 'Naogaon Sadar Upazila',
              children: []
            },
            {
              label: 'Atrai',
              children: []
            },
            {
              label: 'Sapahar Upazila',
              children: [
                {
                  label: 'Goala  union ',
                  children: []
                },
                {
                  label: 'Tilna  union ',
                  children: []
                },
                {
                  label: 'Aihai  union ',
                  children: []
                },
                {
                  label: 'Pathari  union ',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [treeData, setTreeData] = useState(initialTreeData);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    const filteredTreeData = filterTreeData(initialTreeData, event.target.value);
    setTreeData(filteredTreeData);
  };

  const filterTreeData = (data, term) => {
    return data.filter((node) => {
      const lowerCaseLabel = node.label.toLowerCase();
      const lowerCaseTerm = term.toLowerCase();
      const includesTerm = lowerCaseLabel.includes(lowerCaseTerm);
      const hasChildren = node.children && node.children.length > 0;

      if (includesTerm) {
        return true;
      } else if (hasChildren) {
        const filteredChildren = filterTreeData(node.children, term);
        return filteredChildren.length > 0;
      }

      return false;
    });
  };
  return (
    <div>
        <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
        <ul id="myUL">
        {treeData.map((node) => (
            <TreeNode key={node.label} node={node} />
        ))}
        </ul>
    </div>
  );
};

export default TreeView;
