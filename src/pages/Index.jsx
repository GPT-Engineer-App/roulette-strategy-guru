import { useState } from "react";
import { Box, Heading, Text, VStack, HStack, Button, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Table, Thead, Tbody, Tr, Th, Td, TableContainer, useColorMode } from "@chakra-ui/react";
import { FaSpinner } from "react-icons/fa";

const STRATEGIES = [
  { id: "martingale", name: "Martingale", description: "Double bet after each loss" },
  { id: "dalembert", name: "D'Alembert", description: "Increase bet by one after loss, decrease by one after win" },
  { id: "fibonacci", name: "Fibonacci", description: "Bet according to Fibonacci sequence, move up two numbers after a loss" },
];

const Index = () => {
  const [strategy, setStrategy] = useState(STRATEGIES[0].id);
  const [startingBet, setStartingBet] = useState(1);
  const [rounds, setRounds] = useState(10);
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const calculateStrategy = () => {
    setIsCalculating(true);

    // Simulate results
    const newResults = [];
    let currentBet = startingBet;
    let totalWinnings = 0;

    for (let i = 0; i < rounds; i++) {
      const won = Math.random() < 0.5;
      const payout = won ? currentBet * 2 : 0;
      totalWinnings += payout - currentBet;

      newResults.push({
        round: i + 1,
        bet: currentBet,
        won: won ? "Yes" : "No",
        payout,
        totalWinnings,
      });

      if (strategy === "martingale") {
        currentBet = won ? startingBet : currentBet * 2;
      } else if (strategy === "dalembert") {
        currentBet = won ? Math.max(currentBet - 1, startingBet) : currentBet + 1;
      } else if (strategy === "fibonacci") {
        // TODO: Implement Fibonacci strategy
        currentBet = won ? startingBet : currentBet + startingBet;
      }
    }

    setResults(newResults);
    setIsCalculating(false);
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Roulette Betting Strategist
      </Heading>

      <img src="https://svgshare.com/i/tKw.svg" alt="Roulette Wheel" width="400px" style={{ margin: "0 auto" }} />

      <VStack spacing={8} align="stretch">
        <HStack spacing={4}>
          <Button onClick={toggleColorMode}>Toggle {isDarkMode ? "Light" : "Dark"} Mode</Button>
          <Select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
            {STRATEGIES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
          <NumberInput value={startingBet} min={1} onChange={(_, value) => setStartingBet(value)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput value={rounds} min={1} max={1000} onChange={(_, value) => setRounds(value)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button colorScheme="blue" onClick={calculateStrategy} disabled={isCalculating}>
            {isCalculating ? <FaSpinner /> : "Calculate"}
          </Button>
        </HStack>

        {results.length > 0 && (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Round</Th>
                  <Th>Bet Amount</Th>
                  <Th>Won</Th>
                  <Th>Payout</Th>
                  <Th>Total Winnings</Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((result) => (
                  <Tr key={result.round}>
                    <Td>{result.round}</Td>
                    <Td>{result.bet}</Td>
                    <Td>{result.won}</Td>
                    <Td>{result.payout}</Td>
                    <Td>{result.totalWinnings}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
