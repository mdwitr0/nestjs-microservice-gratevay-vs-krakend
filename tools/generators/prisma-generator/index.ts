import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  Tree
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

interface GeneratorOptions {
  name: string;
  provider: string;
}

const directoryName = 'prisma-clients';
const directoryPath = `libs/${directoryName}`;
const templatePath = joinPathFragments(__dirname, './template');

const getPrismaOutputPath = (name: string): string =>  `../../../../node_modules/.prisma/${name}-client`;
const getEnvParam = (constantName:string): string => `${constantName}_DB_URL=fish://example.org\n`
const getDefaultLibFilePath = (name: string): string => `${directoryPath}/${name}/src/lib/${directoryName}-${name}.ts`;

const addEnvParamAndCreateEnvFile = async (tree: Tree, constantName: string): Promise<void> => {
  if (!tree.exists('.env') ) tree.write('.env', '')

  let envContents = tree.read('.env').toString()
  envContents += getEnvParam(constantName)
  tree.write('.env', envContents)
}

const removeDefaultLibFile = async (tree: Tree, name: string): Promise<void> => tree.delete(getDefaultLibFilePath(name))


export default async function (tree: Tree, schema: GeneratorOptions) {
  const { name, className, constantName } = names(schema.name)
  await libraryGenerator(tree, { name: schema.name, directory: directoryName, unitTestRunner: 'none'});


  generateFiles(
    tree,
    templatePath,
    directoryPath,
    {
      dbType: schema.provider,
      tmpl: '',
      name,
      className,
      constantName,
      outputPath: getPrismaOutputPath(name)
    }
  )

  await addEnvParamAndCreateEnvFile(tree, constantName)
  await removeDefaultLibFile(tree, name)

  await formatFiles(tree)

}
