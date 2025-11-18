"use client";
import React, { useState } from "react";
import AutoComplete from "./AutoComplete";
import { autoCompleteDataList } from "../utils/utils";

const AutoCompleteContainer = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-[#242424]  border border-[#363636] rounded-xl">
      <AutoComplete
        placeholder="Search..."
        query={query}
        setQuery={setQuery}
        dataList={autoCompleteDataList}
      />
    </div>
  );
};

export default AutoCompleteContainer;
