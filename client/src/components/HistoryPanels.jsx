function HistoryPanels({ panel }) {
  console.log(panel);
  //sbcfpd
  const iconsArray = [];
  for (let i = 0; i < panel.panelIcons.length; i++) {
    let newImg =
      panel.panelIcons[i].draggedElement.split("/")[3] +
      "/" +
      panel.panelIcons[i].draggedElement.split("/")[4];
    iconsArray.push(newImg);
  }
  return (
    <div
      style={{ backgroundImage: `url(${panel.panelWall})` }}
      className=" border-[1px] border-red-600 rounded-xl flex justify-center items-center bg-no-repeat bg-cover p-4"
    >
      <div
        style={{
          backgroundColor: panel.panelGlass,
          borderColor: panel.panelFrame,
        }}
        className="w-[90%] h-[200px] bg-zinc-600 rounded-2xl border-2 flex justify-center items-center gap-2"
      >
        {Array.from({ length: panel.panelVariant[0] }, (_, i) => (
          <div key={i} className="w-[40px] h-[40px] border-2 border-red-600 ">
            <img src={`${iconsArray[i]}`} />
          </div>
        ))}
        {Array.from({ length: panel.panelVariant[1] }, (_, i) => (
          <div key={i} className="w-[40px] h-[40px] border-2 border-red-600 ">
            <img src={`/Bell/bell.png`} />
          </div>
        ))}
        {Array.from({ length: panel.panelVariant[2] }, (_, i) => (
          <div key={i} className="w-[40px] h-[40px] border-2 border-red-600 ">
            <img src={`/Curtain/curtains.png`} />
          </div>
        ))}
        {Array.from({ length: panel.panelVariant[3] }, (_, i) => (
          <div key={i} className="w-[40px] h-[40px] border-2 border-red-600 ">
            <img src={`/Fan/fans01.png`} />
          </div>
        ))}
        {Array.from({ length: panel.panelVariant[4] }, (_, i) => (
          <div key={i} className="w-[40px] h-[40px] border-2 border-red-600 ">
            <img src={`/Accessories/icon2.png`} />
          </div>
        ))}
        {Array.from({ length: panel.panelVariant[5] }, (_, i) => (
          <div key={i} className="w-[40px] h-[40px] border-2 border-red-600 ">
            <img src={`/Dimmer/dimmer.png`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPanels;
