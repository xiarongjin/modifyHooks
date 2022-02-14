import "./index.styl";
export const hooks = async () => {
  const detail = document.querySelector("#detail");
  let fileHandler;

  // 浏览器写入文件
  const writeFile = async (fileHandle, contents) => {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
  };

  // 自定义弹窗组件
  const getModal = async (beforeText, cb) => {
    const inputDiv = document.createElement("div");
    const submit = document.createElement("button");
    submit.innerText = "提交";
    const input = document.createElement("input");
    input.id = "input";
    inputDiv.style.cssText =
      "position:absolute; top:20px; left:10%;display:flex";
    input.value = beforeText;
    inputDiv.appendChild(input);
    inputDiv.appendChild(submit);
    document.body.appendChild(inputDiv);
    submit.onclick = async () => {
      await cb(beforeText, input.value);
      document.body.removeChild(inputDiv);
    };
  };

  // 浏览器 pick 本地文件
  const filePick = async (beforeText, value) => {
    const pickOpt = {
      types: [
        {
          description: "pug",
          accept: {
            "src/*": [".pug"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };
    [fileHandler] = await window.showOpenFilePicker(pickOpt);
    const file = await fileHandler.getFile();
    const contents = await file.text();
    console.log(beforeText, value, contents);
    await writeFile(fileHandler, contents.replace(beforeText, value));
  };

  detail.onclick = async (e) => {
    let idStr = e.currentTarget.id;
    let beforeText = e.target.innerText;
    if (e.target.children.length > 0) return;
    // alert("请点击需要更换文案的位置！");

    console.log("当前文案所在模块 id 为：" + idStr, beforeText);
    await getModal(beforeText, filePick);
  };
};
