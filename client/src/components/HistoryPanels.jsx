import PanelButtons from "./PanelButtons";
import { nanoid } from "@reduxjs/toolkit";

function HistoryPanels({ panel }) {
  const numSwitches = panel.panelVariant[0];
  const numBells = panel.panelVariant[1];
  const numCurtains = panel.panelVariant[2];
  const numFans = panel.panelVariant[3];
  const numPlugs = panel.panelVariant[4];
  const numDimmers = panel.panelVariant[5];

  const buttonItems = [
    numBells > 0 && { count: numBells, type: "Bells" },
    numCurtains > 0 && { count: numCurtains, type: "Curtains" },
    numFans > 0 && { count: numFans, type: "Fans" },
    numPlugs > 0 && { count: numPlugs, type: "Plugs" },
    numDimmers > 0 && { count: numDimmers, type: "Dimmers" },
  ].filter(Boolean);

  const droppablesArray = [];
  let buttonItemPresent = false;
  if (
    numBells > 0 ||
    numCurtains > 0 ||
    numPlugs > 0 ||
    numDimmers > 0 ||
    numFans > 0
  ) {
    buttonItemPresent = true;
  }
  //sbcfpd
  const iconsArray = [];
  if (panel.panelIcons.length > 0) {
    for (let i = 0; i < panel.panelIcons.length; i++) {
      let newImg =
        panel.panelIcons[i]?.draggedElement.split("/")[3] +
        "/" +
        panel.panelIcons[i]?.draggedElement.split("/")[4];
      iconsArray.push(newImg);
    }
  }
  for (let i = 0; i < numSwitches; i++) {
    droppablesArray.push(i + 1);
  }
  const { panelSize, panelFrame, panelGlass } = panel;

  return (
    <div
      style={{ backgroundImage: `url(${panel.panelWall})` }}
      className=" border-[1px] border-red-600 rounded-xl flex flex-col justify-center items-center bg-no-repeat bg-cover p-4"
    >
      <h2 className="font-bold bg-black text-white p-[1px] px-2">
        Panel Size : {panelSize}
      </h2>
      <div
        style={{
          width: `${
            panelSize !== 2 ? (panelSize === 4 ? "80%" : "95%") : "70%"
          }`,
          backgroundColor: panelGlass,
          height: `${panelSize <= 4 ? 290 : 280}px`,
          borderColor: panelFrame,
        }}
        className="w-[90%] bg-zinc-600 rounded-2xl border-2 flex justify-center items-center gap-2"
      >
        {/* PANEL SIZE 2  */}
        {panelSize === 2 && (
          <div
            className={`flex justify-center items-center w-[70%] h-[70%] gap-4 gap-y-1 p-0 px-[1px] flex-wrap`}
          >
            {/* SWITCHES  */}
            {numSwitches > 0 &&
              iconsArray.map((item) => {
                return (
                  <div
                    key={nanoid()}
                    className="w-[30%] h-[30%] border-2 border-[#1AE0FA] rounded-sm flex justify-center items-center"
                  >
                    <img src={item} />;
                  </div>
                );
              })}

            {/* PANEL BUTTONS  */}
            {buttonItems &&
              buttonItems.map((item, index) =>
                item.count > 0
                  ? Array.from({ length: item.count }, (_, i) => (
                      <PanelButtons
                        key={`${item.type}-${index}-${i}`}
                        type={item.type}
                        width={"100%"}
                      />
                    ))
                  : null
              )}
          </div>
        )}

        {/* PANEL SIZE 4  */}
        {panelSize === 4 && (
          <>
            <div
              className={`flex justify-center items-center w-[50%] h-[70%] gap-4 p-2 pr-0 ${
                numSwitches >= 4 && !buttonItemPresent ? "-mx-4" : ""
              } flex-wrap`}
            >
              {/* SWITCHES  */}
              {droppablesArray.length > 0
                ? buttonItemPresent === false
                  ? droppablesArray
                      .slice(0, droppablesArray.length / 2)
                      .map((item, i) => {
                        return (
                          <div
                            key={nanoid()}
                            className="w-[30%] h-[30%] border-2 border-[#1AE0FA] rounded-sm flex justify-center items-center"
                          >
                            <img src={`/${iconsArray[i]}`} />
                          </div>
                        );
                      })
                  : droppablesArray.map((item, i) => {
                      return (
                        <div
                          key={nanoid()}
                          className="w-[30%] h-[30%] border-2 border-[#1AE0FA] rounded-sm flex justify-center items-center"
                        >
                          <img src={`/${iconsArray[i]}`} />;
                        </div>
                      );
                    })
                : buttonItemPresent &&
                  buttonItems.map((item, index) =>
                    item.count > 0
                      ? Array.from({ length: item.count / 2 }, (_, i) => (
                          <PanelButtons
                            key={`${item.type}-${index}-${i}`}
                            type={item.type}
                            width={"100%"}
                          />
                        ))
                      : null
                  )}
            </div>
            {/* PANEL BUTTONS  */}
            <div
              className={`flex justify-center items-center w-[50%] h-[70%]  gap-4 p-2 ${
                numSwitches >= 4 && !buttonItemPresent ? "-mx-5" : ""
              } flex-wrap`}
            >
              {buttonItemPresent
                ? numSwitches > 0
                  ? buttonItems.map((item, index) =>
                      item.count > 0
                        ? Array.from({ length: item.count }, (_, i) => (
                            <PanelButtons
                              key={`${item.type}-${index}-${i}`}
                              type={item.type}
                              width={"100%"}
                            />
                          ))
                        : null
                    )
                  : buttonItems
                      .slice(buttonItems.length / 2, buttonItems.length)
                      .map((item, index) =>
                        item.count > item.count / 2
                          ? Array.from({ length: item.count / 2 }, (_, i) => (
                              <PanelButtons
                                key={`${item.type}-${index}-${i}`}
                                type={item.type}
                                width={"100%"}
                              />
                            ))
                          : null
                      )
                : numSwitches > 0 &&
                  droppablesArray
                    .slice(droppablesArray.length / 2, droppablesArray.length)
                    .map((item, i) => {
                      return (
                        <div
                          key={nanoid()}
                          className="w-[30%] h-[30%] border-2 border-[#1AE0FA] rounded-sm flex justify-center items-center"
                        >
                          <img src={`/${iconsArray[i]}`} />;
                        </div>
                      );
                    })}
            </div>
          </>
        )}

        {/* PANEL SIZE 6 */}
        {panelSize === 6 && (
          <>
            <div
              className={`flex justify-center items-center w-[33%] h-[50%]  gap-${
                numSwitches >= 6 ? "2" : "4"
              } p-2 flex-wrap pr-0`}
            >
              {/* SWITCHES  */}
              {droppablesArray.length > 0 &&
                droppablesArray.slice(0, 6).map((item, i) => {
                  return (
                    <div
                      key={nanoid()}
                      className="w-[30%] h-[30%] border-2 border-[#1AE0FA] rounded-sm flex justify-center items-center"
                    >
                      <img src={`/${iconsArray[i]}`} />
                    </div>
                  );
                })}
            </div>
            {/* PANEL BUTTONS  */}
            <div
              className={`flex w-[33%] h-[50%] justify-center items-center gap-4 p-2 flex-wrap`}
            >
              {/* SWITCHES  */}
              {buttonItems.length > 1 ? (
                buttonItems
                  .slice(0, 1)
                  .map((item, index) =>
                    item.count > 0
                      ? Array.from({ length: item.count }, (_, i) => (
                          <PanelButtons
                            key={`${item.type}-${index}-${i}`}
                            type={item.type}
                            width={"100%"}
                          />
                        ))
                      : null
                  )
              ) : (
                //buttonItems.map((item, index) =>
                //     item.count > 1
                //       ? Array.from({ length: 1 }, (_, i) => (
                //           <PanelButtons
                //             key={`${item.type}-${index}-${i}`}
                //             type={item.type}
                //             width={"100%"}
                //           />
                //         ))
                //       : null
                //   )
                <></>
              )}
            </div>

            {/* NEXT  */}
            <div
              className={`flex justify-center items-center w-[33%]  h-[50%]  gap-4 p-2 flex-wrap`}
            >
              {/* SWITCHES  */}
              {buttonItems.length > 1
                ? buttonItems
                    .slice(1, buttonItems.length)
                    .map((item, index) =>
                      item.count > 0
                        ? Array.from({ length: 1 }, (_, i) => (
                            <PanelButtons
                              count={item.count}
                              key={`${item.type}-${index}-${i}`}
                              type={item.type}
                              width={"100%"}
                            />
                          ))
                        : null
                    )
                : buttonItems.map((item, index) =>
                    item.count <= 1 ? (
                      Array.from({ length: 1 }, (_, i) => (
                        <div
                          key={`${item.type}-${index}-${i}`}
                          className="w-1/2 h-full"
                        >
                          <PanelButtons type={item.type} width={"100%"} />
                        </div>
                      ))
                    ) : (
                      <div key={index} className="w-[100%] h-full flex">
                        {Array.from({ length: item.count }, (_, i) => (
                          <PanelButtons
                            key={`${item.type}-${index}-${i}`}
                            type={item.type}
                            width={"100%"}
                          />
                        ))}
                      </div>
                    )
                  )}
            </div>
          </>
        )}

        {/* PANEL 8 MODULES  */}
        {panelSize === 8 && (
          <>
            <div
              className={`flex justify-center items-center w-[33%] h-[50%] gap-4 gap-y-1 p-0 px-[1px] flex-wrap`}
            >
              {/* SWITCHES  */}
              {droppablesArray.length > 0 &&
                droppablesArray.slice(0, 4).map((item, i) => {
                  return (
                    <div
                      key={nanoid()}
                      className="w-[30%] h-[30%] border-2 border-[#1AE0FA] rounded-sm flex justify-center items-center"
                    >
                      <img src={`/${iconsArray[i]}`} />
                    </div>
                  );
                })}

              {/* PANEL BUTTONS  */}
              {buttonItems &&
                buttonItems.map((item, index) =>
                  item.count > 0
                    ? Array.from({ length: item.count }, (_, i) => (
                        <PanelButtons
                          key={`${item.type}-${index}-${i}`}
                          type={item.type}
                          width={"100%"}
                        />
                      ))
                    : null
                )}
            </div>
            <div
              className={`flex justify-center items-center w-[33%] h-[50%] gap-4 gap-y-1 p-0 px-[1px] flex-wrap ${
                numSwitches >= 4 && !buttonItemPresent ? "-mx-8" : ""
              }`}
            >
              {/* SWITCHES  */}
              {droppablesArray.length > 0 &&
                droppablesArray.slice(4, 8).map((item, i) => {
                  return (
                    <div
                      key={nanoid()}
                      className="w-[30%] h-[30%] border-2 border-[#1AE0FA] rounded-sm flex justify-center items-center"
                    >
                      <img src={`/${iconsArray[i]}`} />
                    </div>
                  );
                })}

              {/* PANEL BUTTONS  */}
              {buttonItems &&
                buttonItems.map((item, index) =>
                  item.count > 0
                    ? Array.from({ length: item.count }, (_, i) => (
                        <PanelButtons
                          key={`${item.type}-${index}-${i}`}
                          type={item.type}
                          width={"100%"}
                        />
                      ))
                    : null
                )}
            </div>
            <div
              className={`flex ${
                droppablesArray.slice(8, 12).length <= 2
                  ? "flex-col gap-8"
                  : "gap-4 gap-y-1"
              } justify-center items-center w-[33%] h-[50%]  p-0 px-[1px] flex-wrap ${
                numSwitches >= 4 && !buttonItemPresent ? "-ml-8" : ""
              }`}
            >
              {/* SWITCHES  */}
              {droppablesArray.length > 0 &&
                droppablesArray.slice(8, 12).map((item, i) => {
                  return (
                    <div
                      key={nanoid()}
                      className="w-[30%] h-[30%] border-2 border-[#1AE0FA] rounded-sm flex justify-center items-center"
                    >
                      <img src={`/${iconsArray[i]}`} />
                    </div>
                  );
                })}

              {/* PANEL BUTTONS  */}
              {buttonItems &&
                buttonItems.map((item, index) =>
                  item.count > 0
                    ? Array.from({ length: item.count }, (_, i) => (
                        <PanelButtons
                          key={`${item.type}-${index}-${i}`}
                          type={item.type}
                          width={"100%"}
                        />
                      ))
                    : null
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HistoryPanels;
