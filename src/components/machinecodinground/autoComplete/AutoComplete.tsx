"use client";

import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IAutoCompleteDataListRespose } from "./types";
import { useDebounce } from "./hooks";
import { cn } from "@/lib/utils";

const AutoComplete = ({
  query,
  setQuery,
  dataList,
  placeholder,
}: {
  placeholder: string;
  dataList: IAutoCompleteDataListRespose[];
  setQuery: React.Dispatch<SetStateAction<string>>;
  query: string;
}) => {
  const [highlightIndex, setHighlightedIndex] = useState(-1);
  const debouceValue = useDebounce(query);
  const [suggestionList, setSuggestList] = useState<
    IAutoCompleteDataListRespose[]
  >([]);

  const handleSuggestions = (query: string) => {
    const data = dataList.filter((item) =>
      item.role.toLowerCase().includes(query.toLowerCase())
    );
    if (data.length === 0) {
      setSuggestList([]);
    } else {
      setSuggestList(data);
    }
  };

  const handleOnSelectItem = (suggestion: IAutoCompleteDataListRespose) => {
    setQuery(suggestion.role);
    setSuggestList([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev < suggestionList.length - 1 ? prev + 1 : 0) // loop to start
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev > 0 ? prev - 1 : suggestionList.length - 1) // loop to end
        );
        break;

      case "Enter":
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < suggestionList.length) {
          const selectedItem = suggestionList[highlightIndex];
          handleOnSelectItem(selectedItem);
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (debouceValue.length > 1) {
      handleSuggestions(debouceValue);
    } else {
      setSuggestList([]);
    }
  }, [debouceValue]);

  return (
    <div className="flex flex-col">
      <div className="px-4 my-4">
        <input
          type="text"
          className="w-full h-[42px] px-4 py-2 border border-white text-white"
          placeholder={placeholder}
          value={query}
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <SuggestionList
        query={query}
        highlightIndex={highlightIndex}
        dataList={suggestionList}
        onSelectItem={handleOnSelectItem}
      />
    </div>
  );
};

export default AutoComplete;

const SuggestionList = ({
  dataList,
  query,
  onSelectItem,
  highlightIndex,
}: {
  query: string;
  dataList: IAutoCompleteDataListRespose[];
  onSelectItem: (suggestion: IAutoCompleteDataListRespose) => void;
  highlightIndex: number;
}) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
      itemRefs.current[highlightIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth", // optional
      });
    }
  }, [highlightIndex]);

  const getHighLightText = (
    item: IAutoCompleteDataListRespose,
    query: string,
    highlight: boolean,
    index: number
  ) => {
    const parts = item.role.split(new RegExp(`(${query})`, "gi"));

    return (
      <li
        ref={(el: any) => (itemRefs.current[index] = el)}
        key={item.id}
        onClick={() => onSelectItem(item)}
        className={cn(
          "text-base text-white capitalize hover:bg-[#363636] p-4",
          highlight ? "bg-[#363636]" : ""
        )}
      >
        {parts.map((item: string) => (
          <span
            className={
              item.toLowerCase().includes(query.toLowerCase())
                ? "font-bold text-green-600 text-lg"
                : ""
            }
          >
            {item}
          </span>
        ))}
      </li>
    );
  };

  return (
    <ul className="max-h-[250px] overflow-y-scroll shadow">
      {dataList.map((item, index) =>
        getHighLightText(
          item,
          query,
          highlightIndex === index ? true : false,
          index
        )
      )}
    </ul>
  );
};
