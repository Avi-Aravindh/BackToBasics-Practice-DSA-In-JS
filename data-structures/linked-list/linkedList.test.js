import LinkedList from './LinkedList';

describe('LinkedList', () => {
  it('should create a linked list', () => {
    const linkedList = new LinkedList();
    expect(linkedList.head).toBe(null);
  });

  it('should prepend data', () => {
    const linkedList = new LinkedList();
    linkedList.prepend(5);
    linkedList.prepend(10);
    expect(linkedList.toString()).toBe('10,5');
  });

  it('should append data', () => {
    const linkedList = new LinkedList();
    linkedList.append(5);
    linkedList.append(10);
    expect(linkedList.toString()).toBe('5,10');
  });
  it('should delete head', () => {
    const linkedList = new LinkedList();
    linkedList.append(5);
    linkedList.append(10);
    linkedList.append(15);
    linkedList.append(20);
    linkedList.deleteHead();
    expect(linkedList.toString()).toBe('10,15,20');
  });

  it('should delete head1', () => {
    const linkedList = new LinkedList();
    linkedList.deleteHead();
    expect(linkedList.toString()).toBe('');
  });

  it('should delete tail empty', () => {
    const linkedList = new LinkedList();
    linkedList.deleteTail();
    expect(linkedList.toString()).toBe('');
  });

  it('should delete tail', () => {
    const linkedList = new LinkedList();
    linkedList.append(5);
    linkedList.append(10);
    linkedList.append(15);
    linkedList.append(20);
    linkedList.deleteTail();
    expect(linkedList.toString()).toBe('5,10,15');
  });
  it('find value empty', () => {
    const linkedList = new LinkedList();
    expect(linkedList.find(5)).toBeNull;
  });

  it('find value available', () => {
    const linkedList = new LinkedList();
    linkedList.append(5);
    linkedList.append(10);
    linkedList.append(15);
    linkedList.append(20);
    expect(linkedList.find(5)).toBe(0);
    expect(linkedList.find(15)).toBe(2);
    expect(linkedList.find(150)).toBe(-1);
  });

  it('remove duplicates empty', () => {
    const linkedList = new LinkedList();
    linkedList.removeDuplicates();
    expect(linkedList.toString()).toBe('');
  });

  it('remove duplicates ', () => {
    const linkedList = new LinkedList();
    linkedList.append(5);
    linkedList.append(10);
    linkedList.append(15);
    linkedList.append(20);
    linkedList.removeDuplicates();
    expect(linkedList.toString()).toBe('5,10,15,20');
  });

  it('remove duplicates ', () => {
    const linkedList = new LinkedList();
    linkedList.append(5);
    linkedList.append(10);
    linkedList.append(10);
    linkedList.append(20);
    linkedList.removeDuplicates();
    expect(linkedList.toString()).toBe('5,10,20');
  });
  it('reverse  ', () => {
    const linkedList = new LinkedList();
    linkedList.append(5);
    linkedList.append(10);
    linkedList.append(10);
    linkedList.append(20);
    linkedList.reverse();
    expect(linkedList.toString()).toBe('20,10,10,5');
  });
});
