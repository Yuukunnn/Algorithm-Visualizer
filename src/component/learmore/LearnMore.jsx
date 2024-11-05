import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LearnMore = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Box p={3}>
        <Box textAlign="center" my={4}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              cursor: "pointer",
              mb: 4,
              "&:hover": { color: "primary.main" },
              width: "100%",
            }}
            onClick={() => navigate("/")}
          >
            A Complete Guide to Algorithm Visualizer
          </Typography>
        </Box>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            width: "100%",
            "& .MuiTabs-scroller": {
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          <Tab label="Bubble Sort" />
          <Tab label="Insertion Sort" />
          <Tab label="Selection Sort" />
          <Tab label="Merge Sort" />
          <Tab label="Quick Sort" />
        </Tabs>

        {selectedTab === 0 && (
          <Card sx={{ width: "100%" }}>
            <Accordion
              expanded={expanded}
              onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="bubble-sort-content"
                id="bubble-sort-header"
                sx={{ bgcolor: "#F4E4FA" }}
              >
                <Typography variant="h5">Bubble Sort</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "#F4E4FA" }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography paragraph>
                        Bubble sort is a sorting algorithm that works by
                        repeatedly comparing adjacent elements in an array and
                        swapping them if they are not in the desired order. The
                        desired order can be either ascending or descending. To
                        illustrate how Bubble Sort works, let's consider the
                        array <code>arr = [1, 4, 2, 5, -2, 3]</code>. The goal
                        is to sort this array in ascending order using Bubble
                        Sort.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography paragraph>
                        <strong>Steps:</strong>
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText primary="Compare the element at index 0 with the element at index 1. If the element at index 0 is greater than the element at index 1, swap them. If it is not greater, do nothing." />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Move to the next pair: compare the element at index 1 with the element at index 2. Swap them if necessary." />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Continue this process for the entire array, comparing each adjacent pair of elements and swapping them if needed." />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography paragraph>
                        This process is repeated for each element, progressively
                        ensuring that the largest unsorted elements "bubble" up
                        to their correct positions in the array. The algorithm
                        continues to pass through the array until no more swaps
                        are needed, indicating that the array is sorted.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" paragraph>
                        <strong>Properties:</strong>
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        <Chip
                          label="Stable"
                          color="primary"
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="O(1) extra space"
                          color="secondary"
                          sx={{
                            "&:hover": {
                              backgroundColor: "secondary.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="O(n²) comparisons and swaps"
                          color="warning"
                          sx={{
                            "&:hover": {
                              backgroundColor: "warning.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Adaptive: O(n) when nearly sorted"
                          color="info"
                          sx={{
                            "&:hover": {
                              backgroundColor: "info.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <CardMedia
                        component="img"
                        image="./images/BubbleSort.png"
                        alt="Bubble Sort"
                        sx={{
                          mt: 2,
                          maxHeight: 400,
                          objectFit: "contain",
                          width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" },
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </AccordionDetails>
            </Accordion>
          </Card>
        )}

        {selectedTab === 1 && (
          <Card sx={{ width: "100%" }}>
            <Accordion
              expanded={expanded}
              onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="insertion-sort-content"
                id="insertion-sort-header"
                sx={{ bgcolor: "#FEE7CA" }}
              >
                <Typography variant="h5">Insertion Sort</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "#FEE7CA" }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography paragraph>
                        Insertion sort processes the array one element at a
                        time, shifting elements as necessary to maintain sorted
                        order. It is particularly efficient for small or nearly
                        sorted datasets, but it has a time complexity of
                        \(O(n^2)\) in the average and worst cases, making it
                        less suitable for large, unsorted arrays.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography paragraph>
                        Despite its \(O(n^2)\) worst-case time complexity,
                        insertion sort is often preferred for nearly sorted data
                        due to its adaptive nature or for small problem sizes
                        because of its low overhead. Additionally, insertion
                        sort is stable, which makes it a common choice as the
                        base case in recursive divide-and-conquer sorting
                        algorithms, such as merge sort or quick sort.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" paragraph>
                        <strong>Properties:</strong>
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        <Chip
                          label="Stable"
                          color="primary"
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="O(1) extra space"
                          color="secondary"
                          sx={{
                            "&:hover": {
                              backgroundColor: "secondary.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="O(n²) comparisons and swaps"
                          color="warning"
                          sx={{
                            "&:hover": {
                              backgroundColor: "warning.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Adaptive: O(n) when nearly sorted"
                          color="info"
                          sx={{
                            "&:hover": {
                              backgroundColor: "info.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Very low overhead"
                          color="success"
                          sx={{
                            "&:hover": {
                              backgroundColor: "success.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <CardMedia
                        component="img"
                        image="./images/InsertionSort.png"
                        alt="Insert Sort"
                        sx={{
                          mt: 2,
                          maxHeight: 400,
                          objectFit: "contain",
                          width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" },
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </AccordionDetails>
            </Accordion>
          </Card>
        )}

        {selectedTab === 2 && (
          <Card sx={{ width: "100%" }}>
            <Accordion
              expanded={expanded}
              onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="insertion-sort-content"
                id="insertion-sort-header"
                sx={{ bgcolor: "#F4E4FA" }}
              >
                <Typography variant="h5">Selection Sort</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "#F4E4FA" }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography paragraph>
                        Selection Sort is a straightforward sorting algorithm
                        celebrated for its simplicity and ease of
                        implementation, though it’s not ideal for large
                        datasets. The algorithm works by iteratively selecting
                        the smallest element from the unsorted portion of the
                        array and swapping it with the first unsorted element
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography paragraph>
                        For example, given an array [64, 25, 12, 22, 11],
                        Selection Sort identifies the smallest element (11) and
                        swaps it with the first element (64), resulting in [11,
                        25, 12, 22, 64]. This process continues, narrowing the
                        unsorted portion until the array is fully sorted.
                        Despite its clarity, Selection Sort has a time
                        complexity of 𝑂 ( 𝑛 2 ) O(n 2 ) in all cases, which can
                        make it inefficient for large arrays. It operates
                        in-place with a space complexity of 𝑂 ( 1 ) O(1), but it
                        is not stable, meaning it does not maintain the relative
                        order of equal elements.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" paragraph>
                        <strong>Properties:</strong>
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        <Chip
                          label="Not stable"
                          color="primary"
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="O(1) extra space"
                          color="secondary"
                          sx={{
                            "&:hover": {
                              backgroundColor: "secondary.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Θ(n2) comparisons"
                          color="warning"
                          sx={{
                            "&:hover": {
                              backgroundColor: "warning.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Θ(n) swaps"
                          color="info"
                          sx={{
                            "&:hover": {
                              backgroundColor: "info.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Not adaptive"
                          color="success"
                          sx={{
                            "&:hover": {
                              backgroundColor: "success.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <CardMedia
                        component="img"
                        image="./images/SelectionSort.png"
                        alt="Select Sort"
                        sx={{
                          mt: 2,
                          maxHeight: 400,
                          objectFit: "contain",
                          width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" },
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </AccordionDetails>
            </Accordion>
          </Card>
        )}

        {selectedTab === 3 && (
          <Card sx={{ width: "100%" }}>
            <Accordion
              expanded={expanded}
              onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="insertion-sort-content"
                id="insertion-sort-header"
                sx={{ bgcolor: "#FEE7CA" }}
              >
                <Typography variant="h5">Merge Sort</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "#FEE7CA" }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography paragraph>
                        Merge sort is very predictable. It makes between
                        0.5lg(n) and lg(n) comparisons per element, and between
                        lg(n) and 1.5lg(n) swaps per element. The minima are
                        achieved for already sorted data; the maxima are
                        achieved, on average, for random data. If using Θ(n)
                        extra space is of no concern, then merge sort is an
                        excellent choice: It is simple to implement, and it is
                        the only stable O(n·lg(n)) sorting algorithm. Note that
                        when sorting linked lists, merge sort requires only
                        Θ(lg(n)) extra space (for recursion).
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography paragraph>
                        Merge sort is the algorithm of choice for a variety of
                        situations: when stability is required, when sorting
                        linked lists, and when random access is much more
                        expensive than sequential access (for example, external
                        sorting on tape). There do exist linear time in-place
                        merge algorithms for the last step of the algorithm, but
                        they are both expensive and complex. The complexity is
                        justified for applications such as external sorting when
                        Θ(n) extra space is not available.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" paragraph>
                        <strong>Properties:</strong>
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        <Chip
                          label="Stable"
                          color="primary"
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Θ(n) extra space for arrays (as shown)"
                          color="secondary"
                          sx={{
                            "&:hover": {
                              backgroundColor: "secondary.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Θ(lg(n)) extra space for linked lists"
                          color="warning"
                          sx={{
                            "&:hover": {
                              backgroundColor: "warning.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Θ(n·lg(n)) time"
                          color="info"
                          sx={{
                            "&:hover": {
                              backgroundColor: "info.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Not adaptive"
                          color="success"
                          sx={{
                            "&:hover": {
                              backgroundColor: "success.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Does not require random access to data"
                          color="primary"
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <CardMedia
                        component="img"
                        image="./images/MergeSort.png"
                        alt="Merge Sort"
                        sx={{
                          mt: 2,
                          maxHeight: 400,
                          objectFit: "contain",
                          width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" },
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </AccordionDetails>
            </Accordion>
          </Card>
        )}

        {selectedTab === 4 && (
          <Card sx={{ width: "100%" }}>
            <Accordion
              expanded={expanded}
              onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="insertion-sort-content"
                id="insertion-sort-header"
                sx={{ bgcolor: "#F4E4FA" }}
              >
                <Typography variant="h5">Quick Sort</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "#F4E4FA" }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography paragraph>
                        When carefully implemented, quicksort is a robust
                        algorithm with low overhead. It is an excellent
                        general-purpose sort when stability is not required,
                        especially when using the 3-way partitioning version.
                        The 2-way partitioning approach, while clear, is less
                        efficient due to poor locality and can exhibit O(n²)
                        time complexity when there are few unique keys. A more
                        efficient and robust 2-way partitioning method is
                        described in "Quicksort is Optimal" by Robert Sedgewick
                        and Jon Bentley.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography paragraph>
                        This method ensures balanced recursion even with many
                        values equal to the pivot, providing probabilistic
                        guarantees of O(n·lg(n)) time complexity and O(lg(n))
                        space complexity for all inputs. When both sub-sorts are
                        performed recursively, quicksort requires O(n) extra
                        space for the recursion stack in the worst case if
                        recursion is not balanced. This is highly unlikely but
                        can be mitigated by recursively sorting the smaller
                        sub-array first. The sort of the larger sub-array can
                        then be done using iteration instead of recursion. With
                        this optimization, the algorithm uses O(lg(n)) extra
                        space in the worst case.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" paragraph>
                        <strong>Properties:</strong>
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        <Chip
                          label="Stable"
                          color="primary"
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="O(1) extra space"
                          color="secondary"
                          sx={{
                            "&:hover": {
                              backgroundColor: "secondary.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="O(n2) comparisons and swaps"
                          color="warning"
                          sx={{
                            "&:hover": {
                              backgroundColor: "warning.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Adaptive: O(n) when nearly sorted"
                          color="info"
                          sx={{
                            "&:hover": {
                              backgroundColor: "info.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                        <Chip
                          label="Very low overhead"
                          color="success"
                          sx={{
                            "&:hover": {
                              backgroundColor: "success.dark",
                              color: "white",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <CardMedia
                        component="img"
                        image="./images/QuickSort.png"
                        alt="Quick Sort"
                        sx={{
                          mt: 2,
                          maxHeight: 400,
                          objectFit: "contain",
                          width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" },
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </AccordionDetails>
            </Accordion>
          </Card>
        )}

        {/* Add more cards for other sorting algorithms here like above */}

        <Typography variant="body2" sx={{ mt: 2 }}>
          Explore and understand pathfinding algorithms and sorting algorithms
          in depth with our visualizers. The pathfinding visualizer allows you
          to see visually how different algorithms work, compare their
          efficiency, and gain a better grasp of their practical applications.
          Whether you're interested in classic algorithms like A* and Dijkstra's
          or more advanced techniques, the visualizer provides interactive
          demonstrations to enhance your learning experience. Similarly, the
          sorting visualizer helps you grasp sorting algorithms through engaging
          and interactive visualizations, making complex concepts more
          accessible.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/sorting")}
            sx={{
              borderRadius: 5,
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              transition: "background-color 0.3s",
              textTransform: "none"

            }}
          >
            Try Sorting Visualizer
          </Button>
        </Box>
        <Box mt={4}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/pathfinding")}
            sx={{
              borderRadius: 5,
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
              transition: "background-color 0.3s",
              textTransform: "none"
            }}
          >
            Try Pathfinding Visualizer
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LearnMore;