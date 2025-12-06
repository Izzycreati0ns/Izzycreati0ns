import { FamilyMember, RawFamilyData } from './types';

// The raw data structure provided
const rawData: RawFamilyData = {
  "Mutengo wa Banja (Chakumanda)": {
    "Esnart": {
      "Enelesi": ["Diyana","Stephen","Idah","John","Goodwin","Melfia","Emmanuel","Anna"],
      "DaugLous": ["Winnie","Alice","Getrude","Morine","Yolam","Jason","Elina","Delika","Timothy","Sofia"]
    },
    "Liya": {"Kezala": []},
    "Milika": {
      "Dorika": [],
      "Salome": ["Kholina","Levy","Edwin","Joyce","Jason","Mary","Nathan","Salome","Keneth","Felix","Zakayo","James"],
      "Philimon": ["Jeremia","Augustine","Catherine"],
      "Wilson": ["Wilson","Rickson","Simon","Ester"]
    },
    "Ntamizia": {
      "Ester": ["Zebron","Liya","Lorraine","Christine","Phales","Paul","Aaron","Margie"],
      "Ben": [],
      "Eunice": {
        "Jones": {
          "Chakola": [],
          "Winnie": [],
          "Richman": {
            "Flevia": ["Lushomo", "Jayden"],
            "Chikumbutso": ["Zambe"],
            "Isaac": [],
            "Kondwani": [],
            "Taonga": []
          },
          "Obert": []
        }
      }
    },
    "Deliya": ["Luka","William","Esnart","Fred","Lokwa"],
    "Edina": {
      "Simon": ["DaugLous"],
      "Constantino Mischek": ["Edna","Willy","DaugLous","Mabvuto","Liya","Vailet","Dennis"]
    },
    "Aaron": ["Chikonjiwe","John (twin)","Diana (twin)"],
    "Festo": ["Oan","Vailet"],
    "Agness": ["Theresa","Esneli","Beauty","Dany","Royce","Folinite","Filesista"],
    "Timothy Chinsenga Banda": ["Edna","Margie","Timothy","Misheck","Lorraine","Patrick","Aaron","Debra","Ethel"]
  }
};

let idCounter = 0;
const generateId = () => `node-${++idCounter}`;

export const transformData = (
  data: RawFamilyData | string[], 
  name: string = "Root", 
  parentId?: string
): FamilyMember => {
  const currentId = generateId();
  let children: FamilyMember[] = [];

  if (Array.isArray(data)) {
    // Leaf nodes
    children = data.map(childName => ({
      id: generateId(),
      name: childName,
      children: [],
      parentId: currentId
    }));
  } else if (typeof data === 'object') {
    // Branch nodes
    children = Object.entries(data).map(([key, value]) => {
      return transformData(value, key, currentId);
    });
  }

  return {
    id: currentId,
    name,
    children,
    parentId
  };
};

const rootKey = Object.keys(rawData)[0];
const rootValue = rawData[rootKey];

export const initialTreeData: FamilyMember = transformData(rootValue as RawFamilyData | string[], rootKey);

export const flattenTree = (node: FamilyMember): FamilyMember[] => {
  let list = [node];
  node.children.forEach(child => {
    list = [...list, ...flattenTree(child)];
  });
  return list;
};

export const findPath = (targetId: string, node: FamilyMember, currentPath: string[] = []): string[] | null => {
  if (node.id === targetId) {
    return [...currentPath, node.id];
  }
  
  for (const child of node.children) {
    const path = findPath(targetId, child, [...currentPath, node.id]);
    if (path) return path;
  }
  
  return null;
};
