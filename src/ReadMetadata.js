const metadataKaifeng = JSON.stringify({
  "source": {
    "hash": "0xfea2b58194ad560a2c6f69c44d9a1bb206a6814b3c083fa5de05300cd4cf5f49",
    "language": "ink! 3.0.1",
    "compiler": "rustc 1.61.0-nightly"
  },
  "contract": {
    "name": "prototype_coin",
    "version": "0.1.0",
    "authors": [
      "supinren <spr@pku.edu.cn>"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [
            {
              "label": "admin",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            "Creates a new ERC-20 contract with the specified initial supply."
          ],
          "label": "new",
          "payable": false,
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [],
      "events": [
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "from",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 19
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "to",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 19
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " Event emitted when a token transfer occurs."
          ],
          "label": "Transfer"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "spender",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " Event emitted when an approval occurs that `spender` is allowed to withdraw",
            " up to the amount of `value` tokens from `owner`."
          ],
          "label": "Approval"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "volunteer",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "change",
              "type": {
                "displayName": [
                  "i32"
                ],
                "type": 20
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "total_time",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 21
              }
            }
          ],
          "docs": [
            " Event emitted when volunteer time change."
          ],
          "label": "UpdateTime"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "from",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 19
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "to",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 19
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " Event emitted when mint occurs."
          ],
          "label": "MintTo"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "eventid",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 11
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "caller",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "time",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " Event emitted when user apply for verify."
          ],
          "label": "DoVerify"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "validator",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "object",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "attitude",
              "type": {
                "displayName": [
                  "bool"
                ],
                "type": 16
              }
            }
          ],
          "docs": [
            " Event emitted when validator confirm someone's apply."
          ],
          "label": "Approve"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "object",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " Event emitted when apply to faucet."
          ],
          "label": "ApplyToFaucet"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "caller",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "user_list",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 13
              }
            }
          ],
          "docs": [
            " Event emitted when enroll users."
          ],
          "label": "EnrollUsers"
        }
      ],
      "messages": [
        {
          "args": [
            {
              "label": "volun_list",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 13
              }
            }
          ],
          "docs": [
            " 社区用户批量注册"
          ],
          "label": "enroll_volunteers",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 14
          },
          "selector": "0x09490f00"
        },
        {
          "args": [
            {
              "label": "volunteer",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " 社区用户单个注册"
          ],
          "label": "enroll_volunteer",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 14
          },
          "selector": "0xe5bbddc3"
        },
        {
          "args": [
            {
              "label": "eventid",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 11
              }
            },
            {
              "label": "object",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "label": "voluntime",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " 认证志愿服务记录"
          ],
          "label": "do_verification",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 14
          },
          "selector": "0xab61e8ae"
        },
        {
          "args": [],
          "docs": [
            " 管理员账号"
          ],
          "label": "get_admin",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "AccountId"
            ],
            "type": 2
          },
          "selector": "0x57b8a8a7"
        },
        {
          "args": [],
          "docs": [
            " 社区币总发行量"
          ],
          "label": "total_supply",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Balance"
            ],
            "type": 0
          },
          "selector": "0xdb6375a8"
        },
        {
          "args": [
            {
              "label": "owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " 查询某人账号余额"
          ],
          "label": "balance_of",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Balance"
            ],
            "type": 0
          },
          "selector": "0x0f755a56"
        },
        {
          "args": [
            {
              "label": "owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " 查询某人志愿时长"
          ],
          "label": "time_of",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "u128"
            ],
            "type": 0
          },
          "selector": "0x324b1e82"
        },
        {
          "args": [
            {
              "label": "owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "label": "spender",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " 查询授权的剩余额度"
          ],
          "label": "allowance",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Balance"
            ],
            "type": 0
          },
          "selector": "0x6a00165e"
        },
        {
          "args": [
            {
              "label": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "label": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " 转账"
          ],
          "label": "transfer",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 14
          },
          "selector": "0x84a15da1"
        },
        {
          "args": [
            {
              "label": "spender",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "label": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " 授权消费额度"
          ],
          "label": "approve",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 14
          },
          "selector": "0x681266a0"
        },
        {
          "args": [
            {
              "label": "from",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "label": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            },
            {
              "label": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " 授权额度转账"
          ],
          "label": "transfer_from",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 14
          },
          "selector": "0x0b396f18"
        },
        {
          "args": [
            {
              "label": "new_admin",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " 更换社区管理员"
          ],
          "label": "change_admin",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 14
          },
          "selector": "0x61ae97d7"
        },
        {
          "args": [
            {
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " 社区币兑换时间币"
          ],
          "label": "communitycoin_to_timecoin",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 14
          },
          "selector": "0xdfbf82cc"
        },
        {
          "args": [],
          "docs": [
            " 查询该社区的总志愿时长"
          ],
          "label": "total_volunteer_time",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "u128"
            ],
            "type": 0
          },
          "selector": "0xe2c41c93"
        },
        {
          "args": [
            {
              "label": "object",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " 查询某人是否已在该社区注册"
          ],
          "label": "already_enroll",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "bool"
            ],
            "type": 16
          },
          "selector": "0x3c308b1f"
        },
        {
          "args": [
            {
              "label": "object",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " 查询某人是否已经得到资助"
          ],
          "label": "already_faucet",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "bool"
            ],
            "type": 16
          },
          "selector": "0xbc531ec4"
        },
        {
          "args": [
            {
              "label": "eventid",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 11
              }
            }
          ],
          "docs": [
            " 查询志愿服务记录"
          ],
          "label": "get_event",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 17
          },
          "selector": "0x1c7f7fa8"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "cell": {
                "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "total_supply"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                "ty": 1
              }
            },
            "name": "balances"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                "ty": 6
              }
            },
            "name": "allowances"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                "ty": 2
              }
            },
            "name": "contract_owner"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                "ty": 2
              }
            },
            "name": "contract_admin"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                "ty": 1
              }
            },
            "name": "volunteer_time"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "total_volunteer_time"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0700000000000000000000000000000000000000000000000000000000000000",
                "ty": 8
              }
            },
            "name": "is_enroll"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0800000000000000000000000000000000000000000000000000000000000000",
                "ty": 8
              }
            },
            "name": "is_faucet"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0900000000000000000000000000000000000000000000000000000000000000",
                "ty": 10
              }
            },
            "name": "event_list"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 2
            },
            {
              "name": "V",
              "type": 0
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 3,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_env",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 4
            }
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 3,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_primitives",
            "Key"
          ]
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 7
            },
            {
              "name": "V",
              "type": 0
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "tuple": [
              2,
              2
            ]
          }
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 2
            },
            {
              "name": "V",
              "type": 9
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "tuple": []
          }
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 11
            },
            {
              "name": "V",
              "type": 12
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 11,
        "type": {
          "def": {
            "sequence": {
              "type": 4
            }
          }
        }
      },
      {
        "id": 12,
        "type": {
          "def": {
            "tuple": [
              2,
              2,
              0
            ]
          }
        }
      },
      {
        "id": 13,
        "type": {
          "def": {
            "sequence": {
              "type": 2
            }
          }
        }
      },
      {
        "id": 14,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 9
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 15
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 9
            },
            {
              "name": "E",
              "type": 15
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 15,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "InsufficientBalance"
                },
                {
                  "index": 1,
                  "name": "InsufficientAllowance"
                },
                {
                  "index": 2,
                  "name": "PermissionDenied"
                },
                {
                  "index": 3,
                  "name": "NeedEnroll"
                },
                {
                  "index": 4,
                  "name": "AlreadyEnroll"
                },
                {
                  "index": 5,
                  "name": "GetRuntimeFailed"
                },
                {
                  "index": 6,
                  "name": "RepeatFaucet"
                },
                {
                  "index": 7,
                  "name": "EventDoesNotExit"
                }
              ]
            }
          },
          "path": [
            "prototype_coin",
            "prototype_coin",
            "Error"
          ]
        }
      },
      {
        "id": 16,
        "type": {
          "def": {
            "primitive": "bool"
          }
        }
      },
      {
        "id": 17,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 18
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 15
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 18
            },
            {
              "name": "E",
              "type": 15
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 18,
        "type": {
          "def": {
            "tuple": [
              11,
              12
            ]
          }
        }
      },
      {
        "id": 19,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 2
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 2
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 20,
        "type": {
          "def": {
            "primitive": "i32"
          }
        }
      },
      {
        "id": 21,
        "type": {
          "def": {
            "primitive": "u32"
          }
        }
      }
    ]
  }
})

export {
  metadataKaifeng
}