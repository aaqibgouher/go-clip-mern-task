import React from "react";
import AppLayout from "../layouts/AppLayout";
import CandidateListComponent from "../components/candidate/CandidateListComponent";

const CandidatePage = () => {
  return (
    <AppLayout>
      <CandidateListComponent />
    </AppLayout>
  );
};

export default CandidatePage;
