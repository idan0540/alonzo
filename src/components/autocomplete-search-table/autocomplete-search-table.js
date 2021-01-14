import './autocomplete-search-table.css';
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Parser from 'html-react-parser';

const columns = [
  { id: "name", label: "שם", minWidth: 200 },
  { id: "date", label: "תאריך עדכון", minWidth: 100 },
  { id: "classified", label: "מסווג", minWidth: 50, classes: { backgroundColor: '#56ff2c', color: '#56ff2c' } },
];

function createData(name, date, classified) {
  return { name, date, classified };
}

const rows = [
  createData('אפיון פרויקט', '21.1.14', 'לא'),
  createData('אפיון פרויקט גמר', '12.1.20', 'לא'),
  createData('אפיון פרוגקט', '1.2.15', 'כן'),
  createData('אפיון פרויקט 19', '5.12.18', 'לא'),
  createData('אפיון פרו סופי', '4.2.14', 'לא'),
  createData('אפיון פרופלור', '8.5.15', 'כן'),
  createData('אפיון פרצת.ויקט 19', '5.12.18', 'לא'),
  createData('אפיון פרו סופי', '4.2.14', 'לא'),
  createData('אפישדגון וןףץפרופלור', '8.5.15', 'כן'),
  createData('אפשדגיון פרויקט 19', '5.12.18', 'לא'),
  createData('אשדגפיון פרו סופי', '4.2.14', 'לא'),
  createData('אפיושדן פרופף8ת.צ7לור', '8.5.15', 'כן'),
  createData('אדשפיועךן פילךרויקט 19', '5.12.18', 'לא'),
  createData('אפ76יון פרו סופי', '4.2.14', 'לא'),
  createData('אפ436טכיון פרופלור', '8.5.15', 'כן'),
  createData('אפיועיצן פרתיי.ויקט 19', '5.12.18', 'לא'),
  createData('אפיוילך.ן פרו סופי', '4.2.14', 'לא'),
  createData('אפיי.ךלון פרופלור', '8.5.15', 'כן'),
];


export default function AutocompleteSearchTable() {

  const [inputText, setInputText] = useState("");
  const [isTableOpen, setIsTableOpen] = useState(false);

  function inputTextChanged(event) {
    setInputText(event.target.value);
    console.log(event.target.value);
  }

  function rowClick(event) {
    console.log(event.target);
    setIsTableOpen(false);
  }

  function blurCheck(event) {
    const focusInCurrentTarget = ({ relatedTarget, currentTarget }) => {
      if (relatedTarget === null) return false;
      let node = relatedTarget.parentNode;
      while (node !== null) {
        if (node === currentTarget) return true;
        node = node.parentNode;
      }
      return false;
    }
    if (!focusInCurrentTarget(event)) {
      setIsTableOpen(false)
    }
  }

  return (
    <div className="autocomplete-search-table_container" onBlur={blurCheck}>
      <input className="autocomplete-search-table_input" placeholder="חפש..." onChange={inputTextChanged} onFocus={() => setIsTableOpen(true)}></input>
      {isTableOpen ? <Paper className="autocomplete-search-table_table" onChange={() => setIsTableOpen(true)}>
        <TableContainer className="autocomplete-search-table_table-container">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={'right'}
                    style={{ minWidth: column.minWidth }}
                    size={'small'}>
                    {Parser(column.label.bold())}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                if (row.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1) {
                  return (
                    <TableRow className="autocomplete-search-table_table-row" hover role="checkbox" tabIndex={-1} key={row.code} onClick={rowClick}>
                      {columns.map((column) => {
                        let value = row[column.id];
                        if (column.id === 'name') {
                          value = value.replace(inputText, '<b>' + inputText + '</b>');
                        }
                        return (
                          <TableCell key={column.id} align={'right'} size={'small'}>
                            {Parser(value)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper> : null}
    </div>
  );
}
