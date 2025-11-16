"use client";
import React, { useState } from "react";
import AutoComplete from "./AutoComplete";
import { autoCompleteDataList } from "../utils/utils";

const index = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-[#242424]  border border-[#363636]  max-w-[360px] mt-12 rounded-xl">
      <AutoComplete
        placeholder="Search..."
        query={query}
        setQuery={setQuery}
        dataList={autoCompleteDataList}
      />
    </div>
  );
};

export default index;
