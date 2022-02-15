import "./index.styl";
export const hooks = async () => {
  const main = document.querySelectorAll("[file-name]");
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

  let inputDiv, submit;

  // 自定义弹窗组件
  const getModal = async (beforeText, cb) => {
    if (!inputDiv) {
      inputDiv = document.createElement("div");
      submit = document.createElement("button");
      submit.innerText = "提交";
      const input = document.createElement("input");
      input.id = "input";
      inputDiv.style.cssText =
        "position:fixed; top:20px; left:10%;display:flex";
      inputDiv.appendChild(input);
      inputDiv.appendChild(submit);
      document.body.appendChild(inputDiv);
    }
    input.value = beforeText;

    submit.onclick = async () => {
      await cb(beforeText, input.value);
      document.body.removeChild(inputDiv);
      inputDic = null;
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

  for (let i = 0; i < main.length; i++) {
    main[i].onclick = async (e) => {
      let idStr = e.currentTarget.getAttribute("file-name");
      let beforeText = e.target.innerText;
      if (e.target.children.length > 0) return;
      // alert("请点击需要更换文案的位置！");
      console.log(
        "当前文案所在文件为：" + idStr,
        "\n当前所选文案为：" + beforeText
      );
      await getModal(beforeText, filePick);
    };
  }
};
