import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

interface Node {
    Id: string;
    Name: string;
    ParentId:string;
    Level:string;
    Children?: Node[];
}


/** Flat node with Expandable and level information */
interface FlatNode {
    Id: string;
    Expandable: boolean;
    Name: string;
    ParentId:string;
    Level:string;
    level: number;
}


@Component({
    selector: 'app-tree',
    template: `
            <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
            <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding [ngClass]="{ 'background-highlight': childrenNode == node.Id}"
                (click)="nodeLabel(node)">
                <button mat-icon-button></button>
                <span class="txtColor">{{node.Name}}</span>
            </mat-tree-node>
            <mat-tree-node *matTreeNodeDef="let node;when: hasChild" matTreeNodePadding>
                <button mat-icon-button matTreeNodeToggle [attr.aria-label]="'toggle ' + node.Name" (click)="dataNode(node)">
                <mat-icon class="mat-icon-rtl-mirror">
                    {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
                </mat-icon>
                </button>
                {{node.Name}}
            </mat-tree-node>
            </mat-tree>
  `

})
export class TreeComponent implements OnInit {
    @Input() dataSrc: any;
    @Output() nodeLabelChange = new EventEmitter();
    @Output() dataLabelChange = new EventEmitter();
    nodeArray: any = [];
    @Input() childrenNode: any;
    @Input() treeArray: any;
    private transformer = (node: Node, level: number) => {
        return {
            Expandable: !!node.Children && node.Children.length > 0,
            Id: node.Id,
            Name: node.Name,
            ParentId:node.ParentId,
            Level:node.Level,
            level: level,
        };
    }

    treeControl = new FlatTreeControl<FlatNode>(
        node => node.level, node => node.Expandable);

    treeFlattener = new MatTreeFlattener(
        this.transformer, node => node.level, node => node.Expandable, node => node.Children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    hasChild = (_: number, node: FlatNode) => node.Expandable;
    constructor() { }
    ngOnChanges(changes: SimpleChanges) {
        this.dataSource.data = this.dataSrc;
        if (this.treeArray.length != 0) {
            this.treeArray.filter((element) => {
                for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
                    if (this.treeControl.dataNodes[i].Name == element) {
                        this.treeControl.expand(this.treeControl.dataNodes[i])
                    }
                }
            })
        }
    }
    ngOnInit() {
    }

    nodeLabel(node) {
    //   this.childrenNode = node.Id;
        this.nodeLabelChange.emit(node)
    }
    dataNode(node) {
        this.nodeArray = [];
        this.treeControl.dataNodes.filter((element) => {
            if (element.Expandable && this.treeControl.isExpanded(element)) {
                this.nodeArray.push(element.Name)
            }
        })
        this.dataLabelChange.emit(node)
        localStorage.setItem('ubtTree', JSON.stringify(this.nodeArray))

    }
}
