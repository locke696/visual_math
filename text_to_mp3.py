import os
import pandas as pd
import asyncio
from edge_tts import Communicate

# --- 用户配置区 ---
EXCEL_FILE = 'data.xlsx'  # 您的 Excel 文件名
OUTPUT_FOLDER = "assets/audio"  # MP3 输出文件夹
# 语音选择 (从下面的选项中选择一个)
# 女声: 'zh-CN-XiaoxiaoNeural'
# 男声: 'zh-CN-YunxiNeural'
VOICE = 'zh-CN-YunxiNeural'


async def main():
    """
    主函数，读取 Excel 并生成 MP3 文件。
    """
    print(f"--- 开始处理，使用语音: {VOICE} ---")

    # 检查并创建输出文件夹
    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)
        print(f"已创建输出文件夹: {OUTPUT_FOLDER}")

    try:
        # 读取 Excel 文件
        df = pd.read_excel(EXCEL_FILE)
        print(f"成功读取 {EXCEL_FILE}，共找到 {len(df)} 条记录。")
    except FileNotFoundError:
        print(f"错误：找不到文件 '{EXCEL_FILE}'。请确保它和脚本在同一个目录下。")
        return
    except Exception as e:
        print(f"读取 Excel 文件时发生错误: {e}")
        return

    # 循环处理 Excel 中的每一行
    for index, row in df.iterrows():
        try:
            n = int(row['n'])
            audio_text = str(row['audio_text'])

            # 检查文本是否为空
            if not audio_text.strip():
                print(f"警告：第 {index + 2} 行的 audio_text 为空，已跳过。")
                continue

            filename = f"step{n}.mp3"
            output_path = os.path.join(OUTPUT_FOLDER, filename)

            print(f"\n正在生成 {filename}...")

            # 创建 Communicate 对象并生成语音
            communicate = Communicate(audio_text, VOICE)
            await communicate.save(output_path)

            print(f"成功保存到 {output_path}")

        except KeyError as e:
            print(f"错误：Excel 文件中缺少必要的列: {e}。请确保表头是 'n' 和 'audio_text'。")
            return
        except Exception as e:
            print(f"处理第 {index + 2} 行时发生错误: {e}")

    print("\n--- 所有 MP3 文件生成完毕！ ---")


if __name__ == "__main__":
    # 因为 edge-tts 是异步库，我们需要用 asyncio 来运行它
    asyncio.run(main())