import { Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useFilters,
  useSortBy,
} from "react-table";
import { FaSort } from "react-icons/fa";
import { useSelector } from "react-redux";
import RegistrationSection from "./RegistrationLink";
import AssignAgency from "./AssignAgency";

const VCoordinatorDetails = ({ handlePopupClose }) => {
  const [value, setValue] = useState("1");
  const [rowData, setRowData] = useState(null);
  //   const [showPopup, setShowPopup] = useState(false);
  const userList = useSelector((state) => state.userlist.data);
  const vCoordinatorList = useMemo(() => {
    return userList.filter((item) => item.role.includes("vCoordinator"));
  }, [userList]);

  const agencyId = "8668";

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const COLUMNS = [
    { Header: "VCo-ordinator Name", accessor: "identityDetails.fullname" },
    { Header: "Email ID", accessor: "contactDetails.email" },
    { Header: "Phone", accessor: "contactDetails.mobile" },
    { Header: "City", accessor: "contactDetails.address.city" },
    { Header: "Status", accessor: "status" },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => vCoordinatorList, [vCoordinatorList]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleRowClick = (rowData) => {
    setRowData(rowData);
    // setShowPopup(!showPopup);
  };

  return (
    <Modal show={true}>
      <Modal.Header closeButton onHide={handlePopupClose}>
        <Modal.Title>Volunteer Co-ordinators Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "20rem" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab
                label="VCo-ordinator List"
                value="1"
                sx={{ textTransform: "none" }}
              />
              <Tab
                label="Assign Agency"
                value="2"
                sx={{ textTransform: "none" }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box paddingTop={"1rem"}>
              <table className="tableNeedList">
                <thead>
                  {headerGroups?.map((headerGroup) => (
                    <tr {...headerGroup?.getHeaderGroupProps()}>
                      {headerGroup?.headers.map((column) => (
                        <th
                          {...column?.getHeaderProps(
                            column?.getSortByToggleProps()
                          )}
                        >
                          {column?.render("Header")}
                          <span>
                            <FaSort />
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page?.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row?.getRowProps()}
                        onClick={() => handleRowClick(row?.original)}
                      >
                        {row?.cells.map((cell) => {
                          return (
                            <td
                              {...cell?.getCellProps()}
                              style={{ width: cell?.column?.width }}
                            >
                              {" "}
                              {cell?.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Box>
            <Box paddingTop={"2rem"}>
              <RegistrationSection agencyId={agencyId} />{" "}
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box>
              <AssignAgency />
            </Box>
          </TabPanel>
        </TabContext>
      </Modal.Body>
    </Modal>
  );
};

export default VCoordinatorDetails;
