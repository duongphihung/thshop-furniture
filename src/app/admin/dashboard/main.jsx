
"use client"
import React from "react";
import { Grid, Box } from "@mui/material";

import {
    BlogCard,
    // SalesOverview,
    ProductPerformance,
    DailyActivities,
} from "./dashboard-components";

const Main = () => {


    return (
        <Box>
            <Grid container spacing={0}>
                {/* ------------------------- row 1 ------------------------- */}
                {/* <Grid item xs={12} lg={12}>
                    <SalesOverview />
                </Grid> */}
                {/* ------------------------- row 2 ------------------------- */}
                <Grid item xs={12} lg={4}>
                    <DailyActivities />
                </Grid>
                <Grid item xs={12} lg={8}>
                    <ProductPerformance />
                </Grid>
                {/* ------------------------- row 3 ------------------------- */}
                <BlogCard />
            </Grid>
        </Box>
    );
};

export default Main;