import * as path from 'path';
import * as fs from 'fs-extra';
import rebuild from '@electron/rebuild';

const rebuildByElectronVersion = async (electronVersion: string) => {
  const productName = `better_sqlite3_${electronVersion}.node`

  const destPath = path.resolve(__dirname, '../product', productName)
  
  if(fs.existsSync(destPath)){
    console.log(`版本${electronVersion}已存在，跳过rebuild ======`);
    return;
  }

  try {
    console.log(`开始 rebuild ${electronVersion} ====`);
    
    await rebuild({
      buildPath: path.resolve(__dirname, '../node_modules/better-sqlite3'),
      electronVersion: electronVersion,
      // arch: 'x86_64',
      arch: 'x86_64'
    });

    console.log('rebuildByElectronVersion success !!!');

    // 复制到 product
    fs.copySync(
      path.resolve(__dirname, '../node_modules/better-sqlite3/build/Release/better_sqlite3.node'),
      destPath,
    );

    console.log('文件复制成功');
    
  } catch (e) {
    console.log(`rebuildByElectronVersion 失败 ！ ${e}`);
  }
};

rebuildByElectronVersion('25.8.0');
