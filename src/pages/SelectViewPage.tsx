import NextPrevButton from "@/components/NextPrevButton";
import PageHeader from "@/components/PageHeader";
import { ID_KEY, viewTypesList } from "@/constant";
import { usePagination } from "@/context/PaginationContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ViewType } from "@/types";
import { FormEvent, useState } from "react";




const SelectViewPage = () => {
  const VIEW_KEY = "View_details";
  const { goToNextPage } = usePagination();
  const [selectedView, setSelectedView] = useState(viewTypesList[0]);
  const {saveDataToStorage, getStoredData} = useLocalStorage();

  function handleViewSelect(value: ViewType) {
    setSelectedView(value);
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const storedViewTypeData = getStoredData(VIEW_KEY);
    const storedId = getStoredData(ID_KEY);

    if(storedViewTypeData){
      const updatedViewType = [...storedViewTypeData, {...selectedView, _id:storedId}];
      saveDataToStorage(VIEW_KEY, updatedViewType);
    }else{
      saveDataToStorage(VIEW_KEY, [{...selectedView, _id:storedId}]);
    }

    goToNextPage();
  }

  return (
    <>
      <PageHeader
        mainTitle="Select a view"
        subTitle="You can also customize this views in settings"
      />
      <form
        className="w-full flex-1 flex flex-col items-center justify-start space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex items-start justify-between flex-1">
          {viewTypesList.map((viewType) => (
            <ViewTypeCard
              key={viewType.id}
              viewType={viewType}
              handleViewSelect={handleViewSelect}
              selectedView={selectedView}
            />
          ))}
        </div>
        <NextPrevButton />
      </form>
    </>
  );
};

const ViewTypeCard = ({
  viewType,
  selectedView,
  handleViewSelect,
}: {
  viewType: ViewType;
  selectedView: ViewType;
  handleViewSelect: (value: ViewType) => void;
}) => {
  return (
    <div className="w-[46%] cursor-pointer">
      <div
        className={`w-full h-[8rem] border border-light rounded-sm flex items-center justify-center ${
          selectedView.title === viewType.title && "border-primary border-[2px]"
        }`}
        onClick={() => {
          handleViewSelect(viewType);
        }}
      >
        <viewType.icon
          className={`h-16 w-16 text-light  ${
            selectedView.title === viewType.title && "text-zinc-500"
          }`}
          strokeWidth={1}
        />
      </div>
      <p
        className={`text-sm text-light text-center ${
          selectedView.title === viewType.title && "text-zinc-600 font-semibold"
        }`}
      >
        {viewType.title}
      </p>
    </div>
  );
};

export default SelectViewPage;
