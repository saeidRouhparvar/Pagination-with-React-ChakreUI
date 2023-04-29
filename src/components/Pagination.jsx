import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Pagination() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTodos, setPaginatedTodos] = useState([]);

  let pageSize =20;
  let pageNumbers;
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos(datas);

        let endIndex = pageSize * currentPage;
        let startIndex = endIndex - pageSize;
        let allShownTodos = datas.slice(startIndex, endIndex);

        setPaginatedTodos(allShownTodos);
      });
  }, []);

  useEffect(() => {
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    let allShownTodos = todos.slice(startIndex, endIndex);

    setPaginatedTodos(allShownTodos);
  }, [currentPage]);

  const changePeginate = (newPage) => {
    setCurrentPage(newPage);
  };

  const pagesCount = Math.ceil(todos.length / pageSize);
  pageNumbers = Array.from(Array(pagesCount).keys());

  return (
    <Box w={'650px'}>
      {!todos ? (
        "Loading..."
      ) : (
        <TableContainer>
          <Table border={"1px"} borderColor={"red.800"} variant="striped">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead >
              <Tr >
                <Th>ID</Th>
                <Th>User ID</Th>
                <Th>Title</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedTodos.map((todo) => (
                <Tr key={todo.id}>
                  <Td>{todo.id}</Td>
                  <Td>{todo.userId}</Td>
                  <Td>{todo.title}</Td>
                  <Td>
                    <Box color={todo.completed ? "green.400" : "red.400"}>
                      {todo.completed ? "Completed" : "Pending"}
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <UnorderedList display={"flex"} m={0} mt={30} justifyContent={'space-between'} listStyleType={"none"}>
        {pageNumbers.map((pageNumber) => (
          <ListItem
            border={"1px solid "}
            borderColor={"gray.600"}
            me={2}
            w={30}
            h={30}
            borderRadius={5}
            display={'flex'}
            justifyContent={"center"}
            alignItems={"center"}
            cursor={"pointer"}
            _hover={{ color: "red" }}
            bg={pageNumber + 1 === currentPage ? "#68D391" : ""}
            fontWeight={600}
            onClick={() => changePeginate(pageNumber + 1)}
            key={pageNumber.id}
          >
            {pageNumber + 1}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
